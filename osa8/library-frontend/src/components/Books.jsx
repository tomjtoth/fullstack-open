import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries';

const Books = ({ page }) => {

  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');

  const sg = (val) => () => setGenre(val);

  const booksResult = useQuery(ALL_BOOKS, {
    // pollInterval: 2000
  });

  useEffect(() => {
    if (booksResult.data) {
      if (booksResult.data.allBooks === null) return

      setBooks([...booksResult.data.allBooks])
    }
  }, [booksResult.data])

  return page !== 'books'
    ? null
    : (booksResult.loading
      ? <div>loading...</div>
      : (
        <div>
          <h2>books</h2>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books
                .filter(b => genre === '' || b.genres.includes(genre))
                .map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h3>filter by genre</h3>
          <label htmlFor="default-genre">all</label>
          <input type="radio" value="" checked={genre === ''}
            name="genre"
            id="default-genre"
            onClick={sg('')} />
          {[...new Set(books
            .map(({ genres }) => genres)
            .flat())
          ].sort().map(g => {

            const id = `rbtn-${g}`

            return <div key={g}>
              <label htmlFor={id}>{g}</label>
              <input type="radio" name="genre" id={id}
                onClick={sg(g)}
                checked={genre === g} />
            </div>
          })}
        </div>
      )
    );
}

export default Books
