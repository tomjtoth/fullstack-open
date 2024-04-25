import { FeedbackProps } from '../types';

let counter = 0;

const Feedback = ({ feedback, setFeedback }: FeedbackProps): JSX.Element => {
  if (feedback) {
    counter++;
    setTimeout(() => {
      if (--counter === 0) setFeedback('');
    }, 5000);

    return <p style={{ color: 'red' }}>{feedback}</p>;
  }

  return <></>;
};

export default Feedback;
