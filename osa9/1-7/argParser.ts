interface Options {
  max: number;
}

const defaultOptions = {
  max: 0,
};

export function argParser(
  args: string[],
  opts: Options = defaultOptions
): number[] {
  if (args.length < 2) throw new Error('too few args');
  if (opts.max > 0 && args.length > opts.max) throw new Error('too many args');

  return args.map((argStr) => {
    const argNum = Number(argStr);

    if (isNaN(argNum) || argStr === '')
      throw new Error(`"${argStr}" is not a valid number`);

    return argNum;
  });
}
