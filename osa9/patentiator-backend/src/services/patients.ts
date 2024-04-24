import { v1 as uuid } from 'uuid';
import data from '../../data/patients';
import { PatientNS, Patient, NewPatient } from '../types';

const getAllNS = (): PatientNS[] => data.map(({ ssn: _ssn, ...rest }) => rest);

const addNew = (obj: NewPatient): Patient => {
  const newDiaryEntry = {
    id: uuid(),
    ...obj,
  };

  data.push(newDiaryEntry);
  return newDiaryEntry;
};

export default { getAllNS, addNew };
