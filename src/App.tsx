import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './components/index';
import AuthContextProvider from './context/AuthContextProvider';
import NavBar from './components/NavBar';
import Joke from './components/Joke';

const App: React.FC = () => {
  return (
  <BrowserRouter>
    <Switch>
      <AuthContextProvider>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/joke' component={Joke}/>
      </AuthContextProvider>
    </Switch>
  </BrowserRouter>
  )
}

export default App;
