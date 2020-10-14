import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { JOKE } from '../queries';
import styled from 'styled-components';
var Loader = require('react-loader');

interface IProps {
  category: string;
}

const Joke: React.FC<IProps> = ({ category }: IProps) => {
  const [jokeObject, setJokeObject] = useState({
    id: '',
    value: '',
    icon_url: '',
  });
  const [joke, { loading, error, data }] = useMutation(JOKE);

  const getJoke = async () => {
    try {
      const response = await joke({ variables: { category } });
      console.log(response.data.joke);
      setJokeObject(response.data.joke);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getJoke();
  }, [category]);

  if (loading) {
    return <Loader loaded={!loading} />;
  } else if (error) {
    return (
      <div>
        <h1>An error occured</h1>
      </div>
    );
  } else if (!data) {
    return <div></div>;
  } else {
    return (
      <JokeContainer>
        <JokeIcon
          src={jokeObject.icon_url && jokeObject.icon_url}
          alt="joke icon"
        />
        <JokeText>{jokeObject.value && jokeObject.value}</JokeText>
      </JokeContainer>
    );
  }
};

const JokeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  border-radius: 10px;
  justify-content: space-between;
  width: 50%;
  height: auto;
  background-color: #ffffff;
  padding: 1rem;
  margin: 0 auto;
  margin-top: 50px;
`;
const JokeText = styled.p`
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
`;
const JokeIcon = styled.img`
  margin: 0 auto;
  margin-bottom: 20px;
`;

export default Joke;
