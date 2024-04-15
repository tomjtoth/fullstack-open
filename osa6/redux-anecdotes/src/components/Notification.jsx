import { useSelector, useDispatch } from 'react-redux'
import { nullFeedback } from '../reducers/notificationReducer'

let counter = 0

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(({ notifications: n }) => n)

  if (notification) {
    ++counter

    const [text, isError = false] = notification

    setTimeout(() => {
      if (--counter === 0)
        dispatch(nullFeedback())
    }, 5000)

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
