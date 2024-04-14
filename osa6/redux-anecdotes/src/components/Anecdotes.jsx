import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {

    const anecdotes = useSelector(({ anecdotes }) => anecdotes)
    const dispatch = useDispatch()


    return (
        <>
            <h2>Anecdotes</h2>{
                anecdotes.map(anecdote =>
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

export default Anecdotes
