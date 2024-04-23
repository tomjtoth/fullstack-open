export function argParser(max: number = 0): number[] {
  const args = process.argv.slice(2);
  if (args.length < 2) throw new Error('too few args');
  if (max > 0 && args.length > max) throw new Error('too many args');

  return args.map((argStr) => {
    const argNum = Number(argStr);

    if (isNaN(argNum) || argStr === '')
      throw new Error(`"${argStr}" is not a valid number`);

    return argNum;
  });
}
