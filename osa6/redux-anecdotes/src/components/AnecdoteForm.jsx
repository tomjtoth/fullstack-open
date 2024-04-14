import { useDispatch } from 'react-redux'
import { createA } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()


  const handleSubmit = (ev) => {
    ev.preventDefault()

    const content = ev.target.content.value
    ev.target.content.value = ''

    dispatch(createA(content))
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
