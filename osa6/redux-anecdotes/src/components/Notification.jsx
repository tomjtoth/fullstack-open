import { useSelector, useDispatch } from 'react-redux'
import { setFeedback } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(({ notifications: n }) => n)

  if (notification) {

    const [text, isError = false] = notification

    setTimeout(() => {
      dispatch(setFeedback(null))
    }, 3000)

    return (
      <div style={{
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: isError ? 'red' : 'green'
      }}>
        {text}
      </div>
    )
  }
}

export default Notification
