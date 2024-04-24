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

interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  ssn: SSN;
  gender: Gender;
  occupation: string;
}

type NewPatient = Omit<Patient, 'id'>;

/** non-sensitive? Patient data */
type PatientNS = Omit<Patient, 'ssn'>;

export { Diagnosis, NewPatient, Patient, PatientNS, SSN, Gender };
