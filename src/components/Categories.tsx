import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CATEGORIES } from '../queries';
import AuthContext from '../context/AuthContext';
import { Joke } from '../components/index';
import styled from 'styled-components';
var Loader = require('react-loader');

const Categories: React.FC = () => {
  let history = useHistory();
  const { isAuth } = useContext(AuthContext);
  const { loading, error, data } = useQuery(CATEGORIES);
  const [currentCategory, setCurrentCategory] = useState('movie');

  const handleCategory = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    setCurrentCategory(data.categories[index]);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token') || null;
    if (!token && !isAuth) {
      history.push('/');
    }
  }, [isAuth, history, data]);

  if (loading) {
    return <Loader loaded={!loading} />;
  } else if (error) {
    return (
      <div>
        <h1>An error occured</h1>
      </div>
    );
  } else {
    return (
      <div>
        <CategoryContainer>
          {data.categories.map((category: string, index: number) => (
            <CategoryButton
              onClick={(e) => {
                handleCategory(e, index);
              }}
              key={category}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryContainer>
        <Joke category={currentCategory} />
      </div>
    );
  }
};

const CategoryButton = styled.button`
  width: 140px;
  height: 45px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  margin: 0 0 10px 0;
`;

const CategoryContainer = styled.div`
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
`;

export default Categories;