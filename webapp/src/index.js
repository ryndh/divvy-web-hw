import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
