const Menu = ({ setPage, token, logout }) => {
  const sp = (page) => () => setPage(page)

  return (
    <div>
      <button onClick={sp('authors')}>authors</button>
      <button onClick={sp("books")}>books</button>
      {token
        ? <>
          <button onClick={sp("newBook")}>add book</button>
          <button onClick={sp("fav")}>recommend</button>
          <button onClick={logout}>logout</button>
        </>
        : <button onClick={sp('login')}>login</button>
      }

    </div>
  )
}

export default Menu
