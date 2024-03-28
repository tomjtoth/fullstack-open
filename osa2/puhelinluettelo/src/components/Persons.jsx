const Persons = ({ x: { persons, filter } }) => (
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
)

export default Persons