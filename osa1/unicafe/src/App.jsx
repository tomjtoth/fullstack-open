import { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>{text}</button>
)

const Label = ({text, count}) => (
  <>{text} {count}</>
)

const getSum = (tbl) => tbl.reduce((v,sub_tot) => v+sub_tot);

const All = ({tbl}) => (
  <Label text="all" count={getSum(tbl)} />
)

const Avg = ({tbl:[pos,neu,neg]}) => (
  <Label text="average" count={(pos-neg)/(pos+neu+neg)} />
)


const Pos = ({tbl:[pos,neu,neg]}) => (
  <Label text="positive" count={pos/(pos+neu+neg)*100 + ' %'} />
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
      <br />
      <All tbl={[good,neutral,bad]} />
      <br />
      <Avg tbl={[good,neutral,bad]} />
      <br />
      <Pos tbl={[good,neutral,bad]} />

    </div>
  )
}

export default App