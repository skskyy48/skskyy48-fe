import Link from 'next/link';
import type { NextPage } from 'next';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../reducers/info';
import { RootState } from './_app';

const Error404: NextPage = () => {
  const isLogin = useSelector((state:RootState) => state.info.isLogin)
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(isLogin) Router.push('/')
  }, [])

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <ErrorText>존재하지 않는 페이지입니다.</ErrorText>
    </>
  );
};

export default Error404;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const ErrorText = styled.h1`
    font-size : 16px;
    text-align:center;
    margin-top : 150px;
`