const PersonForm = ({ x: {
    persons, setPersons,
    newName, setNewName,
    newNum, setNewNum
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