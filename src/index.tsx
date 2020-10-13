import React from 'react';
import ReactDOM from 'react-dom';
import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink, 
  ApolloProvider, 
  ApolloLink, 
  concat } from '@apollo/client'
import App from './App';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwMjYwMTUyNCwiZXhwIjoxNjAyNjA1MTI0fQ.hTTksaTkaMAUJWhzgzJAib_qQS-5I9Jpb5sRGESw_6U",
    }
  });

  return forward(operation);
})
const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
