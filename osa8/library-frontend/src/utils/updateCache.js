export const updateCache = (cache, query, addedBook) => {
  const uniques = (all, added) => {
    const alreadyPresent = all.find(({ author: { name }, title }) => {
      name === added.author.name && title === added.title;
    });

    return alreadyPresent ? all : all.concat(added);
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniques(allBooks, addedBook),
    };
  });
};
