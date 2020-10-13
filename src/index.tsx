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
import { GlobalStyle } from './styles/GlobalStyle'


const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYwMjYxNTYxMiwiZXhwIjoxNjAyNzg4NDEyfQ.ln4XTpl8qzxiHKMGJ0Yp4M-oBB0xx9U9BxhaT_QD7Ow",
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
    <GlobalStyle/>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
