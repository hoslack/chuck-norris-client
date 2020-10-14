import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client'
import { JOKE } from '../queries'
import styled from 'styled-components';
var Loader = require('react-loader')

interface IProps {
    category: string
  }

const Joke: React.FC<IProps> = ({category}: IProps) => {
    console.log(category)
    const [jokeText, setJokeText] = useState('')
    const [ joke, {loading, error, data} ] = useMutation(JOKE);

    const getJoke = async () => {
        try{
            const response = await joke({ variables: { category } })
            console.log(response)
            
            }  catch(err){
                console.log(err)
            }
    }

      useEffect(()=> {
        getJoke()
      },[category])

    if(loading){
        return <Loader loaded={!loading}/>
      }else if(error){
        return (<div><h1>An error occured</h1></div>)
      }
      else if(!data){
        return (<div></div>)
      }
      else{
      return (<JokeContainer>
          <JokeText>Joke</JokeText>
      </JokeContainer>)
}
}


const JokeContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-content: space-between;
border-radius: 10px;
justify-content: space-between;
width: 70%;
max-width: ;
height: auto;
background-color: #9e9d24;
padding: 1rem;
margin: 0 auto;
`

const JokeText = styled.p`

`

export default Joke