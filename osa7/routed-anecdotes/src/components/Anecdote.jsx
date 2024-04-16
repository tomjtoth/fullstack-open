const Anecdote = ({ x: { content, votes, info } }) => (
  <>
    <h2>{content}</h2>
    <div>has {votes} votes</div>
    <div>
      for more info, click <a href={info}>here</a>
    </div>
  </>
)

export default Anecdote
