import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Entry, Diagnosis } from '../../types';
import svc from '../../services/diagnoses';

interface Props {
  entries: Entry[];
}

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
        {entries.map(({ id, date, description, diagnosisCodes }) => {
          const [dateISO] = date.toISOString().split('T');

          return (
            <li key={id}>
              {dateISO}: <i>{description}</i>
              {diagnosisCodes && (
                <ul>
                  {diagnosisCodes.map((dc) => (
                    <li key={`${id}-${dc}`}>
                      {dc}: <i>{diags.find((d) => d.code === dc)?.name}</i>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Entries;
