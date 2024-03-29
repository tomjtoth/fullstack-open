const Feedback = ({ x: { feedback, setFeedback } }) => {
    if (feedback) {

        setTimeout(() => {
            setFeedback(null)
        }, 3000)

        return (
            <p className={feedback.class}>
                {feedback.text}
            </p>
        )
    }
}

export default Feedback
