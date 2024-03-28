import { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>{text}</button>
)

const Label = ({text, count}) => (
  <text>{text} {count}</text>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1> 
      
      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />
      
      <h1>statistics</h1>

      <Label text="good" count={good} />
      <br />
      <Label text="neutral" count={neutral} />
      <br />
      <Label text="bad" count={bad} />

    </div>
  )
}

export default App