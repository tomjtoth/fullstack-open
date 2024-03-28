const Header = ({ course }) => (
    <h1>{course}</h1>
)

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
)

const Content = ({ parts }) => (
    <>
        {parts.map(({ name, exercises, id }) => <Part
            key={id}
            name={name}
            exercises={exercises} />)}
    </>
)

const Total = ({ parts }) => (
    <p>
        <b>
            total of {
                parts
                    .map(({ exercises }) => exercises)
                    .reduce((prev, curr) => prev + curr)
            } exercises
        </b>
    </p>
)

const Course = ({ course: { name, parts } }) => (
    <>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
    </>
)


export default Course