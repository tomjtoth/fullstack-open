import { TotalProps } from '../types';

const Total = (props: TotalProps): JSX.Element => (
  <p>Number of exercises: {props.totalExercises}</p>
);

export default Total;
