import { v1 as uuid } from 'uuid';
import data from '../../data/patients';
import { PatientNS } from '../types';

const getAllNS = (): PatientNS[] => data.map(({ ssn: _ssn, ...rest }) => rest);

export default { getAllNS };
