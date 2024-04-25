import { useState } from 'react';
import { NewFormProps, Weather, Visibility } from '../types';
import { toNewDiaryEntry } from '../utils';
import svc from '../services/flights';

const NewForm = ({
  entries,
  setEntries,
  setFeedback,
}: NewFormProps): JSX.Element => {
  // you SHALL NOT TEST around midnight
  const [today] = new Date().toISOString().split('T');

  const [date, setDate] = useState(today);
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      svc
        .addNew(toNewDiaryEntry({ date, visibility, comment, weather }))
        .then((addedEntry) => {
          if (addedEntry) setEntries(entries.concat(addedEntry));
        });
    } catch (e: unknown) {
      if (e instanceof Error) setFeedback(e.message);
    }

    setDate(today);
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      date{' '}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      visibility:{' '}
      {Object.values(Visibility).map((enumVal) => {
        const enumStr = enumVal.toString();
        const id = `visibility-${enumVal}`;

        return (
          <div key={id}>
            <input
              id={id}
              type="radio"
              name="visibility"
              value={visibility}
              onChange={() => setVisibility(enumStr)}
              required
            />
            <label htmlFor={id}>{enumStr}</label>
          </div>
        );
      })}
      <br />
      weather:{' '}
      {Object.values(Weather).map((enumVal) => {
        const enumStr = enumVal.toString();
        const id = `weather-${enumVal}`;

        return (
          <div key={id}>
            <input
              id={id}
              type="radio"
              name="weather"
              value={weather}
              onChange={() => setWeather(enumStr)}
              required
            />
            <label htmlFor={id}>{enumStr}</label>
          </div>
        );
      })}
      <br />
      comment{' '}
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button type="submit">add</button>
    </form>
  );
};

export default NewForm;
