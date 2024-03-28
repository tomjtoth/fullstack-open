const Persons = ({ x: { persons, filter } }) => {

    const lc_filter = filter.toLowerCase();

    return (
        <ul>
            {(filter === ''
                ? persons
                : persons.filter(({ name, num }) =>
                    name.toLowerCase().includes(lc_filter) || num.includes(filter))
            ).map(({ name, num }, idx) => (
                <li key={idx}>
                    {name} {num}
                </li>
            ))}
        </ul>
    )
}
export default Persons