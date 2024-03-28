const Header = ({ course }) => (
    <h1>{course}</h1>
)

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
)

const Content = ({ parts }) => (
    <ul>
        {parts.map(({ name, exercises, id }) => <Part
            key={id}
            name={name}
            exercises={exercises} />)}
    </ul>
)

const Total = ({ parts: [
    { exercises: ex1 },
    { exercises: ex2 },
    { exercises: ex3 }
] }) => (
    <p>
        Number of exercises {ex1 + ex2 + ex3}
    </p>
)

const Course = ({ course: { name, id, parts } }) => (
    <>
        <Header course={name} />
        <Content parts={parts} />
        {/* <Total parts={parts}></Total> */}

    </>
)


export default Course