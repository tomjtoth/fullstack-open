const Filter = ({ x: { filter, setFilter } }) => (
    <>
        find countries
        <input
            value={filter}
            onChange={({ target: { value } }) => setFilter(value)}
            placeholder="type something to narrow your search" />
    </>
)

export default Filter
