import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

import { HealthCheckRating } from '../../types';

interface Props {
  rating: HealthCheckRating;
}

const Heart = ({ rating }: Props): JSX.Element => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: 'green' }} />;

    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: 'yellow' }} />;

    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: 'red' }} />;

    case HealthCheckRating.CriticalRisk:
      return <HeartBrokenIcon sx={{ color: 'black' }} />;
  }
};

export default Heart;
