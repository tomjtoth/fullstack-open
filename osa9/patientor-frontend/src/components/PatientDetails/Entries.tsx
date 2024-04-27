import { Typography } from '@mui/material';
import { Entry } from '../../types';

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props): JSX.Element => {
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
                    <li key={`${id}-${dc}`}>{dc}</li>
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
