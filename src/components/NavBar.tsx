import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #5cbdb9;
  height: 60px;
  margin-bottom: 4rem;
  box-shadow: 0 10px 10px -10px;
`;

const NavbarItem = styled.a`
  font-size: 2rem;
  margin-right: 1rem;
  color: white;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
    margin: 20px;
    text-transform: uppercase;
    font-size: 14px;
`;

const NavBar: React.FC = () => {
  return (
    <Wrapper>
      <NavbarItem>Sign up</NavbarItem>
      <NavbarItem>Sign in</NavbarItem>
      <NavbarItem>Log out</NavbarItem>
    </Wrapper>
  );
};

export default NavBar;