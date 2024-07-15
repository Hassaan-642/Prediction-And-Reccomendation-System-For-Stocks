import React, { useState } from 'react';
import OriginalChart from './OriginalChart';
import LSTMChart from './LSTMChart';

import ablImage from './abl.jpg';
import akblImage from './akbl.jpg';
import baflImage from './bafl.jpg';
import bahlImage from './bahl.jpg';
import biplImage from './bipl.jpg';
import bokImage from './bok.jpg';
import fablImage from './fabl.jpg';
import hblImage from './hbl.jpg';
import jsblImage from './JS.jpg';
import mcbImage from './mcb.jpg';


const App = () => {
  const [selectedFile, setSelectedFile] = useState('mcb.csv');
  const [accuracy, setAccuracy] = useState('');

  const handleFileChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFile(selectedValue);

    // Extract accuracy information based on the selected bank
    const accuracyData = {
      'abl.csv':  'Prediction Accuracy: 97.35% ',
      'akbl.csv': 'Prediction Accuracy: 94.58%',
      'bafl.csv': 'Prediction Accuracy: 94.98%',
      'bahl.csv': 'Prediction Accuracy: 94.41%',
      'bipl.csv': 'Prediction Accuracy: 94.98%',
      'bok.csv':  'Prediction Accuracy: 96.66%',
      'fabl.csv': 'Prediction Accuracy: 94.98%',
      'hbl.csv':  'Prediction Accuracy: 96.19%',
      'jsbl.csv': 'Prediction Accuracy: 90.63%',
      'mcb.csv':  'Prediction Accuracy: 97.36%',
      // Add more accuracy data as needed
    };

    setAccuracy(accuracyData[selectedValue]);

    // Update image path based on the selected bank
  };

  const recommendationData = {
    'abl.csv': `
      50-day SMA: 82.90506972612879
      200-day SMA: 84.14623723168023
      50-day SMA <= 200-day SMA, so SMA predicts Bearish trend.
      14-day RSI: 49.51806121965001
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.1756679827534865
      MACD Histogram < 0, so MACD predicts Bearish trend.
      Signal Line: -0.17544200246575975
      MACD Histogram: -0.00022598028772672632
      Overall Trend: Bearish
    `,
    // Add similar data for other CSV files
    'akbl.csv': `
      50-day SMA: 19.80811982896846
      200-day SMA: 19.824738989845002
      50-day SMA <= 200-day SMA, so SMA predicts Bearish trend.
      14-day RSI: 49.92801522011715
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.020706504897587907
      MACD Histogram > 0, so MACD predicts Bullish trend.
      Signal Line: -0.02100886418283636
      MACD Histogram: 0.00030235928524846226
      Overall Trend: Bullish
    `,
    'bahl.csv': `
      50-day SMA: 43.571878936521024
      200-day SMA: 44.25965258656224
      50-day SMA <= 200-day SMA, so SMA predicts Bearish trend.
      14-day RSI: 47.451262182189964
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.08254781187254877
      MACD Histogram < 0, so MACD predicts Bearish trend.
      Signal Line: -0.08220769382171511
      MACD Histogram: -0.0003401180508336522
      Overall Trend: Bearish
    `,
     'bafl.csv': `
      50-day SMA: 32.88291141117289
      200-day SMA: 32.7672588562351
      50-day SMA > 200-day SMA, so SMA predicts Bullish trend.
      14-day RSI: 49.02736068238252
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: 0.0005047973077387281
      MACD Histogram > 0, so MACD predicts Bullish trend.
      Signal Line: -0.001091158860151803
      MACD Histogram: 0.0015959561678905146
      Overall Trend: Bullish
    `,
    'bipl.csv': `
      50-day SMA: 9.59050233271946
      200-day SMA: 9.541010313075505
      50-day SMA > 200-day SMA, so SMA predicts Bullish trend.
      14-day RSI: 50.991445298812415
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: 0.007228328086799559
      MACD Histogram > 0, so MACD predicts Bullish trend.
      Signal Line: 0.005553059177435714
      MACD Histogram: 0.001675268909363841
      Overall Trend: Bullish
   `,
  'bok.csv': `
      50-day SMA: 8.697651588212782
      200-day SMA: 8.971301913509377
      50-day SMA <= 200-day SMA, so SMA predicts Bearish trend.
      14-day RSI: 49.52793349604419
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.021485765967512446
      MACD Histogram > 0, so MACD predicts Bullish trend.
      Signal Line: -0.022570566967693533
      MACD Histogram: 0.0010848010001810915
      Overall Trend: Bullish
  `,
  'fabl.csv': `
      50-day SMA: 22.219852754982416
      200-day SMA: 21.97537186400938
      50-day SMA > 200-day SMA, so SMA predicts Bullish trend.
      14-day RSI: 50.33925540866993
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.05054503630583326
      MACD Histogram < 0, so MACD predicts Bearish trend.
      Signal Line: -0.04904150015421324
      MACD Histogram: -0.0015035361516200613
      Overall Trend: Bullish
    `,
    'hbl.csv': `
      50-day SMA: 22.219852754982416
      200-day SMA: 21.97537186400938
      50-day SMA > 200-day SMA, so SMA predicts Bullish trend.
      14-day RSI: 50.33925540866993
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.05054503630583326
      MACD Histogram < 0, so MACD predicts Bearish trend.
      Signal Line: -0.04904150015421324
      MACD Histogram: -0.0015035361516200613
      Overall Trend: Bullish
    `,
     'jsbl.csv': `
      50-day SMA: 5.631094226887363
      200-day SMA: 5.589400262414211
      50-day SMA > 200-day SMA, so SMA predicts Bullish trend.
      14-day RSI: 51.420154774376776
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.0028979479952203073
      MACD Histogram < 0, so MACD predicts Bearish trend.
      Signal Line: -0.0024979403173463572
      MACD Histogram: -0.00040000767787395355
      Overall Trend: Bullish
  `,
     'mcb.csv': `
      50-day SMA: 216.4273129955947
      200-day SMA: 216.98783852790012
      50-day SMA <= 200-day SMA, so SMA predicts Bearish trend.
      14-day RSI: 49.41230733066684
      30 <= RSI <= 70, so RSI predicts Neutral trend.
      MACD Line: -0.2642138975877071
      MACD Histogram < 0, so MACD predicts Bearish trend.
      Signal Line: -0.2626401796330139
      MACD Histogram: -0.0015737179546930291
      Overall Trend: Bearish
  `,
    // Add more recommendation data as needed
  };

  const imageSources = {
    'abl.csv': ablImage,
    'akbl.csv': akblImage,
    'bafl.csv': baflImage,
    'bahl.csv': bahlImage,
    'bipl.csv': biplImage,
    'bok.csv': bokImage,
    'fabl.csv': fablImage,
    'hbl.csv': hblImage,
    'jsbl.csv': jsblImage,
    'mcb.csv': mcbImage,
  };


  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="csv-select">Select CSV file: </label>
        <select id="csv-select" value={selectedFile} onChange={handleFileChange}>
          <option value="mcb.csv">Muslim Commercial Bank</option>
          <option value="abl.csv">Allied Bank Limited</option>
          <option value="bafl.csv">Bank Al-Fallah Limited</option>
          <option value="akbl.csv">Askri Bank Limited</option>
          <option value="hbl.csv">Habib Bank Limited</option>
          <option value="bok.csv">Bank Of Khyber</option>
          <option value="jsbl.csv">JS Bank Limited</option>
          <option value="bahl.csv">Bank Al-Habib Limited</option>
          <option value="fabl.csv">Faysal Bank Limited</option>
          <option value="bipl.csv">Bank Islami Pakistan Limited</option>
        </select>
        {accuracy && <p>{accuracy}</p>}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h1>Recommendation System</h1>
        <pre>{recommendationData[selectedFile]}</pre>
        <img src={imageSources[selectedFile]} alt={`Graph for ${selectedFile}`} style={{ maxWidth: '50%' }} />
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h1>Original graph (Approx 10 years)</h1>
        <OriginalChart fileName={selectedFile} />
      </div>
      <h1>Predicted Graph (2 Months)</h1>
      <LSTMChart fileName={selectedFile} />
    </div>
  );
};

export default App;
