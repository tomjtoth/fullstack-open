import { ContentProps } from '../types';
import Part from './Part';

const Content = (props: ContentProps): JSX.Element => (
  <>
    {props.courseParts.map((p) => (
      <Part key={p.name} {...p} />
    ))}
  </>
);

export default Content;
