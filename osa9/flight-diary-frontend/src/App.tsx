import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import svc from './services/flights';
import Flights from './components/Flights';

function App() {
  const [flights, setFlights] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    svc.getAll(setFlights);
  }, []);

  return (
    <>
      <Flights flights={flights} />
    </>
  );
}

export default App;
