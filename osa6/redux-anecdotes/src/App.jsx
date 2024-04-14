import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"

const App = () => {

  return (
    <>
      <ToastContainer />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
