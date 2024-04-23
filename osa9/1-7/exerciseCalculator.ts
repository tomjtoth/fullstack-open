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
    if (average / target > 0.85) rating = 2;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
