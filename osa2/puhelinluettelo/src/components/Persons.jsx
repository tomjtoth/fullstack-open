const Persons = ({ x: { persons, filter } }) => {

    const lc_filter = filter.toLowerCase();

    return (
        <ul>
            {(filter === ''
                ? persons
                : persons.filter(({ name, number }) =>
                    name.toLowerCase().includes(lc_filter) || number.includes(filter))
            ).map(({ name, number }, idx) => (
                <li key={idx}>
                    {name} {number}
                </li>
            ))}
        </ul>
    )
}
export default Persons