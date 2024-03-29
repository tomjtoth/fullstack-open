import { useState, useEffect } from 'react'
import backend from './services/query'
import Filter from './components/Filter'
import Results from './components/Results';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    backend.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  return (
    <>
      <Filter x={{ filter, setFilter }} />
      <Results x={{ filter, setFilter, countries }} />
    </>
  )
}

export default App
