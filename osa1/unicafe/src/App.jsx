import { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({values: [good, neutral, bad]}) => {
  if (good+neutral+bad === 0)
    return (
      <>
        <h1>statistics</h1>
        no feedback given
      </>
    )
  
  return  (
    <>
      <h1>statistics</h1>

      <table>
        <tbody>

          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />

          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
          <StatisticLine text="positive" value={good/(good+neutral+bad)*100 + ' %'} />
        </tbody>
      </table>
    </>
)
}

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
      
      <Statistics values={[good, neutral, bad]} />
    </div>
  )
}

export default App