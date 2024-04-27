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
    return entry;
  });

  return data;
};

export default {
  getAll,
  create,
  getById,
};
