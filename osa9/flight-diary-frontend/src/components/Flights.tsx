import { FlightsProps } from '../types';

const Flights = (props: FlightsProps): JSX.Element => {
  return (
    <>
      <h2>Diary entries</h2>
      <ul>
        {props.flights.map(({ id, date, visibility, weather }) => (
          <li key={id}>
            <strong>{date}</strong>
            <br />
            visibility: {visibility}
            <br />
            weather: {weather}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Flights;
