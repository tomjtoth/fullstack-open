import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry, Diagnosis } from '../../types';

interface Props {
  entry: OccupationalHealthcareEntry;
  diags: Diagnosis[];
}
const OccupationalEntry = ({ entry, diags }: Props): JSX.Element => {
  const {
    date,
    id,
    description,
    diagnosisCodes,
    employerName,
    specialist,
    sickLeave,
  } = entry;

  const [dateISO] = date.toISOString().split('T');

  return (
    <li className="entry">
      {dateISO}
      <WorkIcon />
      {employerName}
      <br />
      <p>
        <i>{description}</i>
      </p>
      {diagnosisCodes && (
        <ul>
          {diagnosisCodes.map((dc) => (
            <li key={`${id}-${dc}`}>
              {dc}: <i>{diags.find((d) => d.code === dc)?.name}</i>
            </li>
          ))}
        </ul>
      )}
      {sickLeave && (
        <p>
          on sick leave from {sickLeave.startDate.toISOString().split('T')[0]}{' '}
          to {sickLeave.endDate.toISOString().split('T')[0]}
        </p>
      )}
      diagnose by {specialist}
    </li>
  );
};

export default OccupationalEntry;
