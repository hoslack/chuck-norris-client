import React from 'react';
import { useQuery, gql } from '@apollo/client'
import SignIn from './components/SignIn';

const App: React.FC = () => {
const CATEGORIES = gql`{
  categories
}`
  const { loading, error, data } = useQuery(CATEGORIES)
  console.log(loading, data, error)

  if(loading){
    return <div>
    <h1>Loading</h1>
  </div>
  }else{
  return (
    <div>
      {data.categories.map((category: string) => <h1>{category}</h1>)}
      <SignIn/>
    </div>
  );}
}

export default App;
