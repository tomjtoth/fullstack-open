interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

type SSN = string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  ssn: SSN;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

type NewPatient = Omit<Patient, 'id'>;

/** non-sensitive? Patient data */
type PatientNS = Omit<Patient, 'ssn' | 'entries'>;

export { Diagnosis, NewPatient, Patient, PatientNS, SSN, Gender };
