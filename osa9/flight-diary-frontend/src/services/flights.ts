import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const resp = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return resp.data;
};

const addNew = async (content: NewDiaryEntry) => {
  try {
    const resp = await axios.post<NonSensitiveDiaryEntry>(baseUrl, content);
    return resp.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) throw new Error(e.message);
  }
};

export default { getAll, addNew };
