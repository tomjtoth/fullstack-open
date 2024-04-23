import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { argParser } from './argParser';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.status(400).json({
      error: 'parameters missing',
    });

  try {
    const [trgt, ...hours] = argParser([target, ...daily_exercises]);
    return res.json(calculateExercises(hours, trgt));
  } catch (e) {
    return res
      .status(400)
      .json({ error: `malformatted parameters: ${e.message}` });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
