const Header = ({course}) => (
  <h1>{course}</h1>
)

const Part = ({part, ex}) => (
  <p>
    {part} {ex}
  </p>
)

const Content = ({parts: [p1,p2,p3], exs: [ex1,ex2,ex3]}) => (
  <>
    <Part part={p1} ex={ex1}></Part>
    <Part part={p2} ex={ex2}></Part>
    <Part part={p3} ex={ex3}></Part>
  </>
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
      <Content parts={
        [part1,part2,part3]
      } exs={
        [exercises1,exercises2,exercises3]
      }></Content>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}></Total>
    </div>
  )
}

export default App