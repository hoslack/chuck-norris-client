import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #33691e;
  height: 60px;
  margin-bottom: 4rem;
  box-shadow: 0 10px 10px -10px;
`;

const NavbarItem = styled.button`
  font-size: 2rem;
  margin-right: 1rem;
  background-color: #e8f5e9;
  border: none;
  border-radius: 4px;
  height: 70%;
  color: black;
  width: 100px;
  font-size: 14px;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;

const NavBar: React.FC = () => {
  let history = useHistory();
  const { isAuth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    const token = window.localStorage.getItem('token') || null;
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [setAuth, isAuth]);

  const logout = () => {
    setAuth(false);
    history.push('/');
    localStorage.clear();
  };

  if (isAuth) {
    return (
      <Wrapper>
        <NavbarItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link to="/categories">Categories</Link>
        </NavbarItem>
        <NavbarItem onClick={logout}>Log out</NavbarItem>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <NavbarItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link to="/signup">Sign up</Link>
        </NavbarItem>
        <NavbarItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link to="/signin">Sign in</Link>
        </NavbarItem>
      </Wrapper>
    );
  }
};

export default NavBar;
