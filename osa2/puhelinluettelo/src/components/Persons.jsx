import backend from '../services/persons'

const Persons = ({ x: {
    persons, setPersons,
    filter,
    setFeedback
} }) => {

    const lc_filter = filter.toLowerCase();

    const handleDelete = (name, id) => {

        if (confirm(`really delete ${name}?`)) {
            backend.deleteExisting(id)
                .then(status => {
                    if (status === 204) {
                        setPersons(persons.filter(p => p.id !== id));

                        setFeedback({
                            class: 'feedback',
                            text: `deleting ${name} succeeded!`
                        });
                    }
                })
                .catch(_ => {
                    setFeedback({
                        class: 'feedback error',
                        text: `${name} was already deleted`
                    });

                    setPersons(persons.filter(p => p.id !== id));
                })
        };
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