export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://polar-everglades-96154.herokuapp.com/graphql'
    : 'http://localhost:8000/graphql'
