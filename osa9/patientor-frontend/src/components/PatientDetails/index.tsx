import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography } from '@mui/material';

import Entries from './Entries.tsx';
import { Patient, Gender } from '../../types';

interface Props {
  patient?: Patient;
}

const PatientDetails = ({ patient }: Props): JSX.Element | null => {
  if (patient) {
    return (
      <>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          {patient.name}
          <sup>
            {patient.gender === Gender.Female ? <FemaleIcon /> : <MaleIcon />}
          </sup>
        </Typography>
        SSN: {patient.ssn}
        <br />
        occupation: {patient.occupation}
        <Entries entries={patient.entries} />
      </>
    );
  }

  return null;
};

export default PatientDetails;
