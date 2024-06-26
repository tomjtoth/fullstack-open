import { NewPatient, Gender, SSN } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// based on https://fi.wikipedia.org/wiki/Henkil%C3%B6tunnus
const parseSsn = (ssn: unknown, gender: Gender, dateOfBirth: Date): SSN => {
  const err = (msg: string) => new Error(`Invalid SSN: "${ssn}", ${msg}`);

  if (!isString(ssn)) {
    throw err('not even a string');
  }

  const hetu =
    /(?<pp>\d\d)(?<kk>\d\d)(?<vv>\d\d)(?:(?<y18s>\+)|(?<y19s>[-YXWVU])|(?<y20s>[ABCDEF]))(?<nnn>\d{3})(?<t>[\dA-FHJ-NPR-Y])/;

  const parts = ssn.match(hetu);

  if (parts) {
    // mikä tääkin on, tossa on _prefix ja silti pitää kytkeä käsin pois, muuten tulee hirvee haloo
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_all, pp, kk, vv, y18s, y19s, _y20s, nnn, t] = parts;

    const nnnNum = Number(nnn);

    if (
      (nnnNum % 2 === 0 && gender === Gender.Male) ||
      (nnnNum % 2 === 1 && gender === Gender.Female)
      // HETU wiki does not recognize 'other' than these 2, so skipping checks...
    )
      throw err(
        `nnn should be odd for men, even for women, yet yours is "${nnn}" and you set "${gender}" as your gender`
      );

    if (nnnNum < 2 || nnnNum > 899)
      throw err(`nnn should be between 002 <= ${nnn} <= 899`);

    const year = (y18s ? 1800 : y19s ? 1900 : 2000) + Number(vv);

    const dateStr = `${kk}/${pp}/${year}`;
    let dateFromSSN;

    try {
      dateFromSSN = new Date(dateStr);
    } catch {
      throw err(`"${dateStr}" is an invalid date`);
    }

    if (
      dateFromSSN.getFullYear() !== year ||
      dateFromSSN.getMonth() !== Number(kk) - 1 ||
      dateFromSSN.getDate() !== Number(pp)
    )
      throw err(
        `according to your SSN you were born on ${year}-${kk}-${pp}, yet you set your date of birth as ${
          dateOfBirth.toISOString().split('T')[0]
        }`
      );

    const tIdx = Number(pp + kk + vv + nnn) % 31;
    const tChr = '0123456789ABCDEFHJKLMNPRSTUVWXY'[tIdx];
    if (tChr !== t) throw err(`last bit should be ${tChr}`);

    return ssn;
  }
  throw err('should be formatted as ppkkvvynnnt');
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): Date => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return new Date(date);
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Invalid string: ' + str);
  }
  return str;
};

const isGender = (str: string): str is Gender =>
  Object.values(Gender)
    .map((v) => v.toString())
    .includes(str);

const parseGender = (str: unknown): Gender => {
  if (!isString(str) || !isGender(str)) {
    throw new Error('Invalid string: ' + str);
  }
  return str;
};

const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in obj &&
    'dateOfBirth' in obj &&
    'ssn' in obj &&
    'gender' in obj &&
    'occupation' in obj
  ) {
    const gender = parseGender(obj.gender);
    const dateOfBirth = parseDate(obj.dateOfBirth);

    const newEntry: NewPatient = {
      name: parseString(obj.name),
      dateOfBirth,
      ssn: parseSsn(obj.ssn, gender, dateOfBirth),
      gender,
      occupation: parseString(obj.occupation),
      entries: [],
    };

    return newEntry;
  }
  throw new Error('Incorrect data: a field missing');
};

export { toNewPatient };
