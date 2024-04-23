import { argParser } from './argParser';

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16) return 'severe thinness';
  if (bmi < 17) return 'moderate thinness';
  if (bmi < 18.5) return 'mild thinness';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'pre-obese';
  if (bmi < 35) return 'obese class 1';
  if (bmi < 40) return 'obese class 2';

  return 'obese class 3';
}

try {
  const [height, weight] = argParser(process.argv.slice(2), { max: 2 });

  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  if (e instanceof Error) console.error(`failed to parse args: ${e.message}`);
}
