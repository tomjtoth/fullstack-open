const Filter = ({ x: { filter, setFilter } }) => {

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <>
            filter shown with
            <input
                value={filter}
                onChange={handleFilterChange} />
        </>
    )
}

export default Filter
