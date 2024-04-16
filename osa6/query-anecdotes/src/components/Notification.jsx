// import { useContext } from 'react'
import { useNotiValue, useNotiDispatch } from '../providers/NotificationContext'

let counter = 0

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const noti = useNotiValue()
  const dispatch = useNotiDispatch()

  if (noti) {
    counter++

    setTimeout(() => {
      if (--counter === 0)
        dispatch({ type: 'NULL' })
    }, 5000)

    return (
      <div style={style}>
        {noti}
      </div>
    )
  }
}

export default Notification
