import backend from '../services/persons'

const PersonForm = ({ x: {
    persons, setPersons,
    newName, setNewName,
    newNum, setNewNum,
    setFeedback
} }) => {

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(({ name }) => name == newName)) {
            if (confirm(
                `${newName} is already added to phonebook,`
                + " replace old number with the new one ? "
            )) {
                backend.updateExisting({
                    ...persons.find(({ name }) => name === newName),
                    number: newNum
                }).then(updatedPerson =>
                    setPersons(persons.map(p =>
                        p.id === updatedPerson.id
                            ? updatedPerson
                            : p
                    ))
                )

                setFeedback({
                    class: 'info',
                    text: `updating ${newName} succeeded!`
                })
            }
            return;
        }

        backend.createNew({
            name: newName,
            number: newNum
        })
            .then(data => {
                setPersons(persons.concat(data))
                setNewName('')
                setNewNum('')

                setFeedback({
                    class: 'info',
                    text: `creating ${newName} succeeded!`
                })
            })

    }

    return (
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
    )
}

export default PersonForm