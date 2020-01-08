import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ExchangeRates from '../ExchangeRates/ExchangeRates'

const client = new ApolloClient({
  link: new RestLink({
    endpoints: {
      exchangerates: {
        uri: 'https://api.exchangeratesapi.io/'
      }
    }
  }),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <ExchangeRates />
      </ErrorBoundary>
    </ApolloProvider>
  )
}

export default App
