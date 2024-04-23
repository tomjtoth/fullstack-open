import { argParser } from './utils/numParser';

interface Res {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(hours: number[], target: number): Res {
  const periodLength = hours.length;
  let trainingDays = 0;
  let average = 0;
  let rating = 1;

  for (const h of hours) {
    if (h === 0) continue;

    average += h;
    trainingDays++;
  }

  if (trainingDays > 0) {
    average /= periodLength;
    if (average > target) rating = 3;
    else if (average / target > 0.85) rating = 2;
  }

  return {
    periodLength,
    trainingDays,
    success: average > target,
    rating,
    ratingDescription: ["that's bad", 'close enough', 'superb'][rating - 1],
    target,
    average,
  };
}

try {
  const [target, ...hours] = argParser(process.argv.slice(2));

  console.log(calculateExercises(hours, target));
} catch (e: unknown) {
  if (e instanceof Error) console.error(`failed to parse args: ${e.message}`);
}
