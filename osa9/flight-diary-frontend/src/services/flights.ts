import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const resp = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return resp.data;
};

const addNew = async (content: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, content);
  return response.data;
};

export default { getAll, addNew };
