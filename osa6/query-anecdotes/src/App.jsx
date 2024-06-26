import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './services/anecdotes'
import Notification from './components/Notification'
import { useNotiDispatch } from './providers/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const notiDispatcher = useNotiDispatch()

  const newAnMut = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAn) => {
      notiDispatcher({
        type: 'SET',
        payload: `added "${newAn.content}"`
      })
      queryClient.invalidateQueries('anecdotes')
      // const anecdotes = queryClient.getQueryData('anecdotes')
      // queryClient.setQueryData(
      //   { queryKey: ['anecdotes'] },
      //   anecdotes.concat(newAn)
      // )
    },
    onError: (e) => {
      notiDispatcher({
        type: 'SET',
        payload: `${e.response.data.error}`
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnMut.mutate({ content, votes: 0 },)
  }

  const voteAnMut = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAn) => {
      notiDispatcher({
        type: 'SET',
        payload: `"${updatedAn.content}" has now ${updatedAn.votes} votes`
      })
      queryClient.invalidateQueries('anecdotes')
      // const anecdotes = queryClient.getQueryData('anecdotes')
      // queryClient.setQueryData(
      //   { queryKey: ['anecdotes'] },
      //   anecdotes.map(localAn =>
      //     localAn.id === updatedAn.id
      //       ? updatedAn
      //       : localAn
      //   )
      // )
    },
  })

  const handleVote = (anecdote) => {
    voteAnMut.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>server error</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />

      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
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
      }    </div>
  )
}

export default App
