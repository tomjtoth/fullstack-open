export const updateCache = (cache, query, addedBook) => {
  const uniques = (all, added) => {
    const alreadyPresent = all.find(
      ({ author: { id }, title }) =>
        id === added.author.id && title === added.title
    );

    return alreadyPresent ? all : all.concat(added);
  };

  cache.updateQuery(query, ({ allBooks }) => ({
    allBooks: uniques(allBooks, addedBook),
  }));
};
