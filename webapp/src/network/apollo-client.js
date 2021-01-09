import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const SERVER_URL = 'http://localhost:8000/graphiql'

export const client = new ApolloClient({
  link: createHttpLink({ uri: SERVER_URL }),
  cache: new InMemoryCache(),
  // headers: {
  //   'Origin': 'http://localhost:3000'
  // },
  credentials: 'include'
});
