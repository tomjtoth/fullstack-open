const ALL = /.*/


const reducer = (state = ALL, { type, payload }) => {

  switch (type) {

    case 'SET_FILTER':
      return payload

    default:
      return state
  }

}

export const changeFilter = (regex) => ({
  type: 'SET_FILTER',
  payload: regex
})

export default reducer