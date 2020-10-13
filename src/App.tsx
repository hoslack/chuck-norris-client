import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, SignUp } from './components/index';
import AuthContext  from './context/AuthContext';
import NavBar from './components/NavBar';
import Joke from './components/Joke';
import SignIn from './components/SignUp';

const App: React.FC = () => {

  const [isAuth, setAuth] = useState(false)
  return (
  <BrowserRouter>
    <Switch>
      <AuthContext.Provider value={{ isAuth, setAuth }}>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/joke' component={Joke}/>
        <Route exact path='/signup' component={SignIn}/>
        <Route exact path='/signin' component={SignUp}/>
      </AuthContext.Provider>
    </Switch>
  </BrowserRouter>
  )
}

export default App;
