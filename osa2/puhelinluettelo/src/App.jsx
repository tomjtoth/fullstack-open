import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Feedback from './components/Feedback'
import backend from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    backend.getAll().then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Feedback x={{ feedback, setFeedback }} />
      <Filter x={{ filter, setFilter }} />
      <h2>add a new</h2>
      <PersonForm x={{
        persons, setPersons,
        newName, setNewName,
        newNum, setNewNum,
        setFeedback
      }} />
      <h2>Numbers</h2>
      <Persons x={{
        persons, setPersons,
        filter,
        setFeedback
      }} />
    </div>
  )

}

export default App
