import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import styled from "styled-components";
import AuthContext from '../context/AuthContext'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #5cbdb9;
  height: 60px;
  margin-bottom: 4rem;
  box-shadow: 0 10px 10px -10px;
`;

const NavbarItem = styled.div`
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
    const {isAuth, setAuth} = useContext(AuthContext)
    console.log(isAuth)
  return (
<Wrapper>
    <NavbarItem>
        <Link to='/signup'>Sign up</Link>
    </NavbarItem>
    <NavbarItem>
          <Link to='/signin'>Sign in</Link>
    </NavbarItem>
    <NavbarItem onClick={() => setAuth(true)}>Log out</NavbarItem>
</Wrapper>
  );
};

export default NavBar;