import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show }) => {

  const allAuthorsResult = useQuery(ALL_AUTHORS, {
    // pollInterval: 2000
  });

  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState(null);
  const [editAuthor, editResult] = useMutation(EDIT_AUTHOR);

  useEffect(() => {
    if (allAuthorsResult.data) {
      if (allAuthorsResult.data.allAuthors === null) return

      setAuthors(allAuthorsResult.data.allAuthors)
    }
  }, [allAuthorsResult.data])

  useEffect(() => {
    if (editResult.data) {
      if (editResult.data.editAuthor === null) return

      setAuthors(authors.map(a => a.name === name
        ? { ...a, born: editResult.data.editAuthor.born }
        : a
      ))
    }
  }, [editResult.data])

  const updateYear = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name,
        setBornTo: Number(year)
      }
    })
  }

  return !show
    ? null
    : (allAuthorsResult.loading
      ? <div>loading...</div>
      : (
        <div>
          <h2>authors</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>set birtyear</h3>

          <form onSubmit={updateYear}>
            <div>
              name
              <select name="name" value={name} required
                onChange={({ target }) => setName(target.value)}
              >
                <option value="" disabled>pick one</option>)

                {authors.map(({ id, name }) =>
                  <option key={`${id}-opt`} value={name}>{name}</option>)
                }
              </select>
            </div>
            <div>
              born
              <input name="year" type="number"
                value={year}
                onChange={({ target }) => setYear(target.value)} />
            </div>
            <button type="submit">update author</button>
          </form>
        </div >
      )
    );
}

export default Authors
