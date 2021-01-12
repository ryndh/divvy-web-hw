import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import { client } from './network/apollo-client'

ReactDOM.render(
  <div>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </div>,
  document.getElementById('react-app')
)
