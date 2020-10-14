import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body{
  background-color: #e8f5e9;
  font-size: 1.4rem;
font-family: sans-serif; 
}
*,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;    
  }  
`