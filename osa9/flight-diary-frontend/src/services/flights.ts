import axios from 'axios';
import { DiarySetter } from '../types';

const baseUrl = '/api/diaries';

const getAll = (setter: DiarySetter) => {
  axios.get(baseUrl).then(({ data }) => setter(data));
};

export default { getAll };
