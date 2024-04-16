import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnMut = useMutation(
    {
      mutationFn: createAnecdote,
      onSuccess: (newAn) => {
        const notes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', notes.concat(newAn))
      },
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnMut.mutate({ content, votes: 0 },)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input minLength="5" name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
