import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      ...AuthorDetails
    }
    genres
  }
  ${AUTHOR_DETAILS}
`;

const ALL_BOOKS = gql`
  query ($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const GET_FAV_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export {
  ALL_BOOKS,
  ADD_BOOK,
  BOOK_ADDED,
  ALL_AUTHORS,
  EDIT_AUTHOR,
  LOGIN,
  GET_FAV_GENRE,
};
