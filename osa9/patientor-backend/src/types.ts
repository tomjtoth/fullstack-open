interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

type SSN = string;

interface BaseEntry {
  id: string;
  description: string;
  date: Date;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: Date;
    criteria: string;
  };
}

enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: Date;
    endDate: Date;
  };
}

type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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

export { Diagnosis, NewPatient, Patient, PatientNS, SSN, Gender, Entry };
