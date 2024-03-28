const Header = ({ course }) => (
    <h3>{course}</h3>
)

const Part = ({ name, exercises }) => (
    <li>
        {name} {exercises}
    </li>
)

const Content = ({ parts }) => (
    <ul>
        {parts.map(({ name, exercises, id }) => <Part
            key={id}
            name={name}
            exercises={exercises} />)}
    </ul>
)

const Total = ({ parts }) => (
    <p>
        <b>
            total of {
                parts
                    .map(({ exercises }) => exercises)
                    .reduce((prev, curr) => prev + curr)
            }&nbsp;exercises
        </b>
    </p>
)

const Course = ({ name, parts }) => (
    <li>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
    </li>
)


export default Course