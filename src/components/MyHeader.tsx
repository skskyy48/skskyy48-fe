import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../pages/_app';
import { setIsLogin } from '../reducers/info';
import Router from 'next/router';

const MyHeader = () => {
    const isLogin = useSelector((state:RootState) => state.info.isLogin)
    const user = useSelector((state:RootState) => state.info.name);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.clear();
        dispatch(setIsLogin(false))
        Router.push('/login')
    }

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {
          isLogin ? 
          <div onClick={() => logout()}>
            <p>{user}</p>
            <p>logout</p>
          </div>
          :
          <Link href='/login'>
            <p>login</p>
          </Link>
        }
      </Header>
      
    </>
  );
};

export default MyHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;