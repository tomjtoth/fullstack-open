import { FlightsProps } from '../types';

const Flights = ({ flights }: FlightsProps): JSX.Element => {
  return (
    <>
      <h2>Diary entries</h2>
      <ul>
        {flights.map(({ id, date, visibility, weather }) => (
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
