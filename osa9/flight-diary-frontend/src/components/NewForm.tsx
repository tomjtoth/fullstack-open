import { useState } from 'react';
import { NewFormProps } from '../types';
import { toNewDiaryEntry } from '../utils';
import svc from '../services/flights';

const NewForm = ({
  entries,
  setEntries,
  setFeedback,
}: NewFormProps): JSX.Element => {
  // you SHALL NOT TEST around midnight
  const [defDate] = new Date().toISOString().split('T');

  const [date, setDate] = useState(defDate);
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      svc
        .addNew(toNewDiaryEntry({ date, visibility, comment, weather }))
        .then((addedEntry) => setEntries(entries.concat(addedEntry)));
    } catch (e: unknown) {
      if (e instanceof Error) setFeedback(e.message);
    }

    setDate(defDate);
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
      visibility{' '}
      <input
        type="text"
        name="visibility"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
      />
      <br />
      weather{' '}
      <input
        type="text"
        name="weather"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
      />
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
