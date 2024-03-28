import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '555-666' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(({ name }) => name == newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({
      name: newName,
      num: newNum
    }))
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input
        value={filter}
        onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input
            value={newNum}
            onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {(
          filter === ''
            ? persons
            : persons.filter(({ name, num }) =>
              name.includes(filter) || num.includes(filter))
        ).map(({ name, num }, idx) => (
          <li key={idx}>
            {name} {num}
          </li>
        ))}
      </ul>

    </div>
  )

}

export default App