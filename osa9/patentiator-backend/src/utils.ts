import { NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
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
    const newEntry: NewPatient = {
      name: parseString(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseString(obj.ssn),
      gender: parseString(obj.gender),
      occupation: parseString(obj.occupation),
    };

    return newEntry;
  }
  throw new Error('Incorrect data: a field missing');
};

export { toNewPatient };
