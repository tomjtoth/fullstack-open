import { useState } from 'react'

const Button = ({ handler, text }) => (
  <button onClick={handler}>{text}</button>
)

const TextBlock = ({ h1, anecdote, votes }) => (
  <>
    <h1>{h1}</h1>
    {anecdote}
    <br />
    has {votes} votes
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(_ => 0));
  const [best, setBest] = useState(0);


  const handleVoting = () => {
    const new_arr = [...votes];
    new_arr[selected]++;
    setVotes(new_arr);
    setBest(new_arr.indexOf(Math.max(...new_arr)));
  }


  return (
    <div>
      <TextBlock
        h1="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]} />

      <br />

      <Button
        handler={handleVoting}
        text="vote" />

      <Button
        handler={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
        text="next anecdote" />

      <TextBlock
        h1="Anecdote with most votes"
        anecdote={anecdotes[best]}
        votes={votes[best]} />

    </div>
  )
}

export default App