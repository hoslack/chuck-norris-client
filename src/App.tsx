import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, SignUp, SignIn, Categories } from './components/index';
import AuthContext  from './context/AuthContext';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const [isAuth, setAuth] = useState(false)
  return (
  <BrowserRouter>
    <Switch>
      <AuthContext.Provider value={{ isAuth, setAuth }}>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/categories' component={Categories}/>
        <Route exact path='/signin' component={SignIn}/>
        <Route exact path='/signup' component={SignUp}/>
      </AuthContext.Provider>
    </Switch>
  </BrowserRouter>
  )
}

export default App;
