import { useState, useEffect } from 'react';

import { NonSensitiveDiaryEntry } from './types';
import svc from './services/flights';

import Feedback from './components/Feedback';
import Flights from './components/Flights';
import NewForm from './components/NewForm';

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    svc.getAll().then((entries) => setEntries(entries));
  }, []);

  return (
    <>
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <NewForm
        entries={entries}
        setEntries={setEntries}
        setFeedback={setFeedback}
      />
      <Flights flights={entries} />
    </>
  );
}

export default App;
