import backend from '../services/persons'

const Persons = ({ x: { persons, setPersons, filter } }) => {

    const lc_filter = filter.toLowerCase();

    const handleDelete = (name, id) => {

        if (confirm(`really delete ${name}?`))
            backend.deleteExisting(id)
                .then(deletedPerson =>
                    setPersons(persons.filter(p => p.id !== deletedPerson.id))
                );
    }

    return (
        <ul>
            {(filter === ''
                ? persons
                : persons.filter(({ name, number }) =>
                    name.toLowerCase().includes(lc_filter) || number.includes(filter))
            ).map(({ name, number, id }) => (
                <li key={id}>
                    {name} {number}
                    <button onClick={handleDelete.bind(null, name, id)}>delete</button>
                </li>
            ))}
        </ul>
    )
}
export default Persons