import HealingIcon from '@mui/icons-material/Healing';
import { HospitalEntry as HospitalEntryType, Diagnosis } from '../../types';

interface Props {
  entry: HospitalEntryType;
  diags: Diagnosis[];
}

const HospitalEntry = ({ entry, diags }: Props): JSX.Element => {
  const { date, id, description, diagnosisCodes, discharge, specialist } =
    entry;
  const [dateISO] = date.toISOString().split('T');

  return (
    <li className="entry">
      {dateISO}
      <HealingIcon />
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
      {discharge && (
        <p>
          <strong>honorable</strong> discharge:
          <br />
          <i>{discharge.criteria}</i>
          <br />
          {discharge.date.toISOString().split('T')[0]}
        </p>
      )}
      diagnose by {specialist}
    </li>
  );
};

export default HospitalEntry;
