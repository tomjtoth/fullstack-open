import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(({ data }) => {
        console.log('promise fulfilled')
        setPersons(data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter x={{ filter, setFilter }} />
      <h2>add a new</h2>
      <PersonForm x={{ persons, setPersons, newName, setNewName, newNum, setNewNum }} />
      <h2>Numbers</h2>
      <Persons x={{ persons, filter }} />

    </div>
  )

}

export default App
