import { useSelector } from "react-redux";

const Feedback = () => {
  const feedback = useSelector(({ feedback }) => feedback);

  if (feedback) {
    const [msg, err = false] = feedback;
    return <p className={err ? "error" : "feedback"}>{msg}</p>;
  }
};

export default Feedback;
