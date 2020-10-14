import React from 'react';
import styled from 'styled-components';
import chuck from '../utils/images/chuck.png';

const Home: React.FC = () => {
  return (
    <ImageContainer>
      <StyledImage src={chuck} alt="Chuck Norris" />
    </ImageContainer>
  );
};

const StyledImage = styled.img`
  border: none;
  border-radius: 20%;
  box-shadow: 0 10px 10px -10px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default Home;
