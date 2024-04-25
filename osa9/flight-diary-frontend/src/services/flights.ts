import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = (): Promise<NonSensitiveDiaryEntry[]> => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(({ data }) => data);
};

const addNew = (content: NewDiaryEntry) => {
  return axios
    .post<NonSensitiveDiaryEntry>(baseUrl, content)
    .then(({ data }) => data)
    .catch((e: unknown) => {
      if (axios.isAxiosError(e)) throw new Error(e.message);
    });
};

export default { getAll, addNew };
