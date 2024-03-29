import axios from "axios"

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

        axios.post("http://localhost:3001/persons", {
            name: newName,
            number: newNum
        })
            .then(({ data }) => {
                setPersons(persons.concat(data))
                setNewName('')
                setNewNum('')
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