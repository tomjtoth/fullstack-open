import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'
import { toast } from 'react-toastify'

const Filter = () => {

  const dispatch = useDispatch()

  const handleFilterChange = (ev) => {
    const str = ev.target.value

    try {
      // Redux complains about regexes being not serializable...
      new RegExp(str)
      dispatch(changeFilter(str));
    }
    catch {
      toast.error(`/${str}/ is not a valid regex`)
    }

  }

  return (
    <p>
      filter
      <input onChange={handleFilterChange}
        placeholder="regex here" />
    </p>
  )
}

export default Filter
