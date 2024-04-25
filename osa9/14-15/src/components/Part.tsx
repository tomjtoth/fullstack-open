import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const content = (part: CoursePart) => {
  switch (part.kind) {
    case 'background':
      return (
        <>
          <i>{part.description}</i>
          <br />
          submit to: {part.backgroundMaterial}
        </>
      );

    case 'basic':
      return <i>{part.description}</i>;

    case 'group':
      return <>project exercises: {part.groupProjectCount}</>;

    case 'special':
      return (
        <>
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(', ')}
        </>
      );

    default:
      return assertNever(part);
  }
};

const Part = (part: CoursePart): JSX.Element => {
  return (
    <p>
      <strong>
        {part.name}: {part.exerciseCount}
      </strong>
      <br />
      {content(part)}
    </p>
  );
};

export default Part;
