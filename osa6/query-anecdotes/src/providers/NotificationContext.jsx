import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET":
      return payload
    case "NULL":
      return null
    default:
      return state
  }
}

const NotiCtx = createContext()

// eslint-disable-next-line react/prop-types
export const NotiCtxProvider = ({ children }) => {
  const [noti, notiDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotiCtx.Provider value={[noti, notiDispatch]}>
      {children}
    </NotiCtx.Provider>
  )
}

export const useNotiValue = () => {
  return useContext(NotiCtx)[0]
}

export const useNotiDispatch = () => {
  return useContext(NotiCtx)[1]
}

export default NotiCtx
