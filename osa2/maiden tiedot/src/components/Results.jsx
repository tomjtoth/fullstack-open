const Results = ({ x: { filter, setFilter, countries } }) => {

    let re_filter;

    try {
        re_filter = new RegExp(filter, 'i');
    }
    catch (e) {
        console.log(e)
        return (
            <p>
                <i>"know NOT regex, you"</i>
                &nbsp;- master Yoda
            </p>
        )
    }


    if (!countries || filter === '') return null;

    const filtered_list = countries.filter(
        ({ name: { common, official } }) =>
            common.match(re_filter) || official.match(re_filter)
    )

    if (filtered_list.length > 10)
        return <p>Too many results</p>;

    if (filtered_list.length == 0)
        return <p>No results, too strict criterium!</p>;

    if (filtered_list.length == 1) {

        const [{
            name: { official: name },
            capital: [capital],
            area,
            languages,
            flag,
            cca2
        }] = filtered_list;

        return (
            <>
                <h1>{name}</h1>

                capital {capital}
                <br />
                area {area}

                <h3>languages</h3>
                <ul>
                    {Object.entries(languages).map(([key, val]) =>
                        <li key={cca2 + key}>
                            {val}
                        </li>
                    )}
                </ul>

                <p className='flag'>{flag}</p>
            </>
        )
    }

    return (
        <ul>
            {filtered_list.map(({ name: { common: name }, cca2 }) =>
                <li key={cca2}>
                    {name}
                    <button onClick={() =>
                        setFilter('^' + name + '$')
                    }>show</button>
                </li>
            )}
        </ul>
    )

}

export default Results
