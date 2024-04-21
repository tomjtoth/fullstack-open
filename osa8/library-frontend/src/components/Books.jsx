import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_FAV_GENRE } from '../queries';

const Books = ({ page }) => {

  const fav = page === 'fav';

  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');

  const sg = (val) => () => setGenre(val);

  const allBooksQry = useQuery(ALL_BOOKS, {
    variables: {
      genre
    }
  });

  const favGenQry = useQuery(GET_FAV_GENRE)

  useEffect(() => {
    if (allBooksQry.data) {
      if (allBooksQry.data.allBooks === null) return

      setBooks([...allBooksQry.data.allBooks])
    }
  }, [allBooksQry.data, genre])

  useEffect(() => {
    if (fav && favGenQry.data) {
      if (favGenQry.data.favoriteGenre === null) return

      setGenre(favGenQry.data.me.favoriteGenre)
    }
  }, [favGenQry.data, fav])

  return page !== 'books' && !fav
    ? null
    : (allBooksQry.loading
      ? <div>loading...</div>
      : (
        <div>
          <h2>{fav ? 'recommendations' : 'books'}</h2>

          {fav && <p>books in your favorite genre <strong>patterns</strong></p>}

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!fav && <>
            <h3>filter by genre</h3>
            <label htmlFor="default-genre">all</label>
            <input type="radio" value="" defaultChecked
              name="genre"
              id="default-genre"
              onClick={sg('')} />
            {[...new Set(books
              .map(({ genres }) => genres)
              .flat())
            ].sort().map(gen => {

              const id = `rbtn-${gen}`

              return <div key={gen}>
                <label htmlFor={id}>{gen}</label>
                <input type="radio" name="genre" id={id}
                  // React was complaining about onClick
                  onChange={sg(gen)}
                  checked={genre === gen} />
              </div>
            })}
          </>}
        </div>
      )
    );
}

export default Books
