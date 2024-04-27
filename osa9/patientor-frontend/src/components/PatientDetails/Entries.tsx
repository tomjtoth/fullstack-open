import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Entry, Diagnosis } from '../../types';
import svc from '../../services/diagnoses';

import './Entries.css';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntryType from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';

interface Props {
  entries: Entry[];
}

const assertNever = (value: Entry): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Entries = ({ entries }: Props): JSX.Element => {
  const [diags, setDiags] = useState<Diagnosis[]>([]);

  useEffect(() => {
    svc.getAll().then((diags) => setDiags(diags));
  }, []);

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: '0.5em' }}>
        entries
      </Typography>
      <ul>
        {entries.map((entry) => {
          switch (entry.type) {
            case 'HealthCheck':
              return (
                <HealthCheckEntry key={entry.id} entry={entry} diags={diags} />
              );

            case 'Hospital':
              return (
                <HospitalEntryType key={entry.id} entry={entry} diags={diags} />
              );

            case 'OccupationalHealthcare':
              return (
                <OccupationalEntry key={entry.id} entry={entry} diags={diags} />
              );

            default:
              return assertNever(entry);
          }
        })}
      </ul>
    </>
  );
};

export default Entries;
