const Header = ({course}) => (
  <h1>{course}</h1>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({parts: [p1,p2,p3]}) => (
  <>
    <Part part={p1}></Part>
    <Part part={p2}></Part>
    <Part part={p3}></Part>
  </>
)

const Total = ({ex1,ex2,ex3}) => (
  <p>
    Number of exercises {ex1 + ex2 + ex3}
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={[part1,part2,part3]}></Content>
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises}></Total>
    </div>
  )
}

export default App