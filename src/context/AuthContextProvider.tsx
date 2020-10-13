import React, { createContext, Component } from 'react'

type ContextProps = { 
    authenticated: boolean
  };
const AuthContext = createContext<Partial<ContextProps>>({})
class AuthContextProvider extends Component {
    state={}

    render(){
        return (
            <AuthContext.Provider value={{authenticated:false}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider
