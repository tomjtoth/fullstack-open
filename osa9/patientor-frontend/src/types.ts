import { Entry, Diagnosis, Gender } from '../../patientor-backend/src/types';

export type { Entry, Diagnosis };
export { Gender };

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
