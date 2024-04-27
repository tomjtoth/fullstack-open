import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Heart from './Heart';
import {
  HealthCheckEntry as HealthCheckEntryType,
  Diagnosis,
} from '../../types';

interface Props {
  entry: HealthCheckEntryType;
  diags: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diags }: Props): JSX.Element => {
  const {
    date,
    id,
    description,
    diagnosisCodes,
    specialist,
    healthCheckRating,
  } = entry;

  const [dateISO] = date.toISOString().split('T');

  return (
    <li className="entry">
      {dateISO}
      <MedicalServicesIcon />
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
      <Heart rating={healthCheckRating} />
      <br />
      diagnose by {specialist}
    </li>
  );
};

export default HealthCheckEntry;
