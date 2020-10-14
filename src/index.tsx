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
import 'react-toastify/dist/ReactToastify.css'

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `bearer ${window.localStorage.getItem('token')}`,
    }
  });
  return forward(operation);
})
const httpLink = createHttpLink({uri: 'https://still-falls-96093.herokuapp.com/graphql'})

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
