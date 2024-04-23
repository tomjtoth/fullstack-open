import qs from 'qs';
import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { argParser } from './argParser';

const app = express();

app.set('query parser', (str: string) => qs.parse(str));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const heStr = req.query.height?.toString() || '';
    const weStr = req.query.weight?.toString() || '';

    const [height, weight] = argParser([heStr, weStr]);

    const bmi = calculateBmi(height, weight);

    res.json({
      weight,
      height,
      bmi,
    });
  } catch (e) {
    if (e instanceof Error)
      res.status(400).json({
        error: 'both "height" and "weight" must be defined in search params',
      });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
