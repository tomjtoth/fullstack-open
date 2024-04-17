import { useSelector } from "react-redux";

const Feedback = () => {
  const feedback = useSelector(({ feedback }) => feedback);

  if (feedback) {
    const [msg, err = false] = feedback;

    const cls = `feedback ${err ? "error" : ""}`;

    return <p className={cls}>{msg}</p>;
  }
};

export default Feedback;
