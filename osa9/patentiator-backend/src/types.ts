interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

type NewPatient = Omit<Patient, 'id'>;

/** non-sensitive? Patient data */
type PatientNS = Omit<Patient, 'ssn'>;

export { Diagnosis, NewPatient, Patient, PatientNS };
