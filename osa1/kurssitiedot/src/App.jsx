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

const Total = ({parts:[
  {exercises: ex1},
  {exercises: ex2},
  {exercises: ex3}
]}) => (
  <p>
    Number of exercises {ex1 + ex2 + ex3}
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

export default App