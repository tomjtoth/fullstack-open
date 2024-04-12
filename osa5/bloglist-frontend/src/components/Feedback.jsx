/**
 * keeps the feedback visible if called multiple times within 5sec
 */
let counter = 0;

const Feedback = ({ x: { feedback, setFeedback } }) => {
    if (feedback) {

        const [msg, err = false] = feedback;

        const cls = `feedback ${err && 'error'}`;

        counter++;

        setTimeout(() => {
            if (--counter === 0)
                setFeedback(null);
        }, 3000);

        return (
            <p className={cls}>
                {msg}
            </p>
        );
    }
};

export default Feedback;
