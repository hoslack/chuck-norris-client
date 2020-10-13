import React from 'react';
import { useQuery } from '@apollo/client'
import { CATEGORIES } from '../queries'


const Joke: React.FC = () => {
    const { loading, error, data } = useQuery(CATEGORIES)
    console.log(loading, data, error)

    if(loading){
        return <div>
        <h1>Loading</h1>
      </div>
      }else{
      return (<div>
          {data.categories.map((category: string) => <h1>{category}</h1>)}
      </div>)
}
}

export default Joke