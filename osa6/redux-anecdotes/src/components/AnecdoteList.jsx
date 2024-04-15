import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setFeedback } from '../reducers/notificationReducer'
import { initAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(({
    filter,
    anecdotes
  }) => {
    const re = new RegExp(filter)
    return anecdotes.filter(a => re.test(a.content))
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [])

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
                <button onClick={() => {
                  dispatch(vote(anecdote.id))
                  dispatch(setFeedback([`you voted "${anecdote.content}"`]))
                }
                }>vote</button>
              </div>
            </div>
          )
      }
    </>
  )
}

export default AnecdoteList
