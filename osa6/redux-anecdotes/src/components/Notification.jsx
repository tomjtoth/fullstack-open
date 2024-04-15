import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({ notifications: n }) => n)

  if (notification) {
    const [text, isError = false] = notification

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
