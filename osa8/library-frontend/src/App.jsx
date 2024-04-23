import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Menu from "./components/Menu";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";

import { BOOK_ADDED, ALL_BOOKS } from "./queries";
import { updateCache } from "./utils/updateCache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setError] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if (token) setToken(token)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data: { data: { bookAdded } } }) => {
      alert(`a new book: "${bookAdded.title}" has been added`)

      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
    }
  })

  const daProps = {
    page, setToken,
    errorMessage, setError,
    token, logout,
    setPage,
  }

  return (
    <div>
      <Menu {...daProps}></Menu>
      <Notify {...daProps} />
      <LoginForm {...daProps} />
      <Authors  {...daProps} />
      <Books {...daProps} />
      <NewBook {...daProps} />
    </div>
  )

};

export default App;
