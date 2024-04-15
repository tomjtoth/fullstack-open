import { useDispatch } from 'react-redux'
import { createNew } from "../reducers/anecdoteReducer"
import { setFeedback } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()


  const handleSubmit = (ev) => {
    ev.preventDefault()

    const content = ev.target.content.value
    ev.target.content.value = ''

    dispatch(createNew(content))
    dispatch(setFeedback(['anecdote added']))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
