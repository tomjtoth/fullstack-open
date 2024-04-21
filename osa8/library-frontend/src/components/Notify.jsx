let counter = 0;

const Notify = ({ errorMessage, setError }) => {

  if (!errorMessage) return null

  counter++;

  setTimeout(() => {
    if (--counter === 0) setError(null);
  }, 5000)

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default Notify