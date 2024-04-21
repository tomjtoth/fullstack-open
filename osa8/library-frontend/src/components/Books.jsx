import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries';

const Books = ({ page }) => {

  const result = useQuery(ALL_BOOKS, {
    // pollInterval: 2000
  });

  return page !== 'books'
    ? null
    : (result.loading
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
              {result.data && result.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    );
}

export default Books
