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
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
