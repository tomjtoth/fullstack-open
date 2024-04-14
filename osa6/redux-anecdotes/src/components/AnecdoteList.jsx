import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(({
    filter: re,
    anecdotes
  }) =>
    anecdotes.filter(a => re.test(a.content)))
  const dispatch = useDispatch()


  return (
    <>
      {
        anecdotes
          .sort((
            { votes: a },
            { votes: b }
          ) => b - a)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() =>
                  dispatch(vote(anecdote.id))
                }>vote</button>
              </div>
            </div>
          )
      }
    </>
  )
}

export default AnecdoteList
