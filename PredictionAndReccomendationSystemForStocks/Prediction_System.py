import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression
from sklearn.impute import SimpleImputer
import numpy as np
import joblib

# Load the data
data = pd.read_csv('jsbl(JSBankLimited).csv')

# Ensure the 'TIME' column is in datetime format with mixed parsing
data['TIME'] = pd.to_datetime(data['TIME'], dayfirst=True, errors='coerce')

# Manually correct the years if they fall outside a reasonable range (e.g., 2000-2024)
current_year = pd.Timestamp.now().year
reasonable_year_range = (2000, current_year)
data['TIME'] = data['TIME'].apply(lambda x: x if reasonable_year_range[0] <= x.year <= reasonable_year_range[1] else x.replace(year=(x.year % 100 + 2000)))

# Drop any rows where the date parsing failed
data = data.dropna(subset=['TIME'])

# Display the corrected dates and ensure no NaT values are present
print(data.head())
print(data['TIME'].unique()[:10])

# Features and target variable
features = ['OPEN', 'HIGH', 'LOW', 'VOLUME']
target = 'CLOSE'

# Splitting the data into features and target
X = data[features]
y = data[target]

# Handle missing values in features by imputing with the mean
feature_imputer = SimpleImputer(strategy='mean')
X = feature_imputer.fit_transform(X)

# Handle missing values in target by imputing with the mean
target_imputer = SimpleImputer(strategy='mean')
y = target_imputer.fit_transform(y.values.reshape(-1, 1)).ravel()

# Apply K-Means clustering
n_clusters = 3  # Number of clusters
kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
train_clusters = kmeans.fit_predict(X)

# Dictionary to hold models for each cluster
models = {}

# Train a separate regression model for each cluster
for cluster in range(n_clusters):
    cluster_data = X[train_clusters == cluster]
    cluster_target = y[train_clusters == cluster]
    model = LinearRegression().fit(cluster_data, cluster_target)
    models[cluster] = model

# Save the models
joblib.dump(kmeans, 'kmeans_model.pkl')
for cluster in range(n_clusters):
    joblib.dump(models[cluster], f'linear_model_cluster_{cluster}.pkl')

# Predict function using clustering and corresponding regression model
def predict(X):
    clusters = kmeans.predict(X)
    predictions = np.zeros(len(X))
    for cluster in range(n_clusters):
        cluster_indices = (clusters == cluster)
        if np.sum(cluster_indices) > 0:
            predictions[cluster_indices] = models[cluster].predict(X[cluster_indices])
    return predictions

# Find the index of the last date before 9-Oct-20
last_date_index = data[data['TIME'] == '20-10-09'].index[-1]

# Get the last date in the dataset
last_date = data['TIME'].iloc[last_date_index]

# Predict the next 50 trading days using a rolling prediction approach
predicted_dates = []
predicted_values = []

i = 0
while len(predicted_dates) < 50:
    # Predict for the next day
    next_date = last_date + pd.Timedelta(days=1)

    # Skip weekends (Saturday and Sunday)
    if next_date.weekday() >= 5:
        last_date = next_date
        continue

    next_data = X[last_date_index + i % len(X)].reshape(1, -1)  # Use the last available data for prediction
    next_prediction = predict(next_data)[0]

    # Append the predicted date and value, rounded to two decimal places
    predicted_dates.append(next_date)
    predicted_values.append(round(next_prediction, 2))

    # Update the last date for the next prediction
    last_date = next_date
    next_data[0, -1] = next_prediction  # Update 'CLOSE' with predicted value
    X = np.vstack([X, next_data])
    i += 1

# Create a DataFrame for the predicted values and dates
predicted_df = pd.DataFrame({'DATE': predicted_dates, 'PREDICTED_CLOSE': predicted_values})

# Load the actual closing prices for the predicted dates from CSV file
actual_data = pd.read_csv('JSBankLimited_ActualCloseUpto50Days.csv')

# Ensure the 'TIME' column is in datetime format
actual_data['TIME'] = pd.to_datetime(actual_data['TIME'], dayfirst=True, errors='coerce')

# Rename columns for consistency
actual_data.rename(columns={'TIME': 'DATE', 'Actual Close': 'ACTUAL_CLOSE'}, inplace=True)

# Drop any rows where the date parsing failed
actual_data = actual_data.dropna(subset=['DATE'])

# Merge the predicted and actual values on the DATE column
merged_df = pd.merge(predicted_df, actual_data, on='DATE', how='inner')

# Calculate accuracy metrics
predicted_values_aligned = merged_df['PREDICTED_CLOSE'].values
actual_values_aligned = merged_df['ACTUAL_CLOSE'].values

mae = np.mean(np.abs(predicted_values_aligned - actual_values_aligned))
mse = np.mean((predicted_values_aligned - actual_values_aligned) ** 2)

# Calculate MAPE
mape = np.mean(np.abs((actual_values_aligned - predicted_values_aligned) / actual_values_aligned)) * 100

# Calculate accuracy as 100% - MAPE
accuracy = 100 - mape

print(f"Mean Absolute Error (MAE): {mae}")
print(f"Mean Squared Error (MSE): {mse}")
print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")
print(f"Accuracy: {accuracy:.2f}%")

# Print or use the predicted dates and corresponding values as needed
print(predicted_df)
