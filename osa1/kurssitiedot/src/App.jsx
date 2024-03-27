const Header = ({course}) => (
  <h1>{course}</h1>
)

// eikö just sovittiin, että kantsii kierrettää uudelleen komponentteja...
const Content = ({part, ex}) => (
  <p>
    {part} {ex}
  </p>
)

const Total = ({ex1,ex2,ex3}) => (
  <p>
    Number of exercises {ex1 + ex2 + ex3}
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content part={part1} ex={exercises1}></Content>
      <Content part={part2} ex={exercises2}></Content>
      <Content part={part3} ex={exercises3}></Content>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}></Total>
    </div>
  )
}

export default App