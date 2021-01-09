import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const SERVER_URL = 'http://localhost:8000/graphql'

export const client = new ApolloClient({
  link: createHttpLink({ uri: SERVER_URL }),
  cache: new InMemoryCache(),
  headers: {
    'origin': 'http://localhost:3000'
  }
});
