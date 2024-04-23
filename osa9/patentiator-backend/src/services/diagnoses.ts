import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => data;

export default { getAll };
