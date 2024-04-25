import { useState, useEffect } from 'react';

import { NonSensitiveDiaryEntry } from './types';
import svc from './services/flights';

import Flights from './components/Flights';
import NewForm from './components/NewForm';

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    svc.getAll().then((entries) => setEntries(entries));
  }, []);

  return (
    <>
      <NewForm entries={entries} setEntries={setEntries} />
      <Flights flights={entries} />
    </>
  );
}

export default App;
