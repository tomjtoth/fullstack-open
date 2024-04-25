import { Patient } from '../src/types';
import { toNewPatient } from '../src/utils';

const data: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-121J',
    gender: 'male',
    occupation: 'New york city cop',
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-771D',
    gender: 'male',
    occupation: 'Cop',
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555A',
    gender: 'other',
    occupation: 'Technician',
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-4322',
    gender: 'female',
    occupation: 'Forensic Pathologist',
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8891',
    gender: 'male',
    occupation: 'Digital evangelist',
  },
].map((entry) => {
  const newPatient = toNewPatient(entry) as Patient;
  newPatient.id = entry.id;
  return newPatient;
});

export default data;
