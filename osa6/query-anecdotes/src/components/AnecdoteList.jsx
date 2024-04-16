import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../services/anecdotes'

const AnecdoteList = () => {

  const queryClient = useQueryClient()

  const voteAnMut = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAn) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(
        { queryKey: ['anecdotes'] },
        anecdotes.map(localAn =>
          localAn.id === updatedAn.id
            ? updatedAn
            : localAn
        )
      )
    },
  })

  const handleVote = (anecdote) => {
    voteAnMut.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  const anecdotes = queryClient.getQueriesData({ queryKey: ['anecdotes'] })

  return (anecdotes &&
    <>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList
