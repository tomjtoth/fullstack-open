import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from './components/Notification';

const App = () => {

  return (
    <>
      <ToastContainer />
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
