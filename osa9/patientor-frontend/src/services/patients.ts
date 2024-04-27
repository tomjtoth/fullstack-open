import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';
const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(baseUrl);

  return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(baseUrl, object);

  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${id}`);

  // the Date object in backend is sent as string...
  data.entries = data.entries.map((entry) => {
    entry.date = new Date(entry.date);
    if (entry.type === 'Hospital' && entry.discharge)
      entry.discharge.date = new Date(entry.discharge.date);

    if (entry.type === 'OccupationalHealthcare' && entry.sickLeave) {
      entry.sickLeave.startDate = new Date(entry.sickLeave.startDate);
      entry.sickLeave.endDate = new Date(entry.sickLeave.endDate);
    }

    return entry;
  });

  return data;
};

export default {
  getAll,
  create,
  getById,
};
