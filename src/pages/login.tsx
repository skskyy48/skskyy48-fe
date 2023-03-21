import Link from 'next/link';
import type { NextPage } from 'next';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../reducers/info';
import { RootState } from './_app';

const LoginPage: NextPage = () => {
  const [id,setId] = useState('');
  const [password,setPassword] = useState('');
  const [isIdError,setIsIdError] = useState(false);
  const [isPassError,setIsPassError] = useState(false);
  const isLogin = useSelector((state:RootState) => state.info.isLogin)
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(isLogin) Router.push('/')
  }, [])
  

  const handleId = (e:ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handlePassword = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const checkId = () => {
    if(id.length < 5 || id.length > 30) setIsIdError(true)
    else if(id.match(/[^0-9a-zA-Z]/) !== null) setIsIdError(true)
    else return setIsIdError(false)
  }

  const checkPassword = () => {
    if(password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/) === null) setIsPassError(true)
    else return setIsPassError(false)
  }

  const login = async () => {
    const data = await axios.post('https://api.sixshop.com/login',{
      id : id,
      password : password
    })

    if(data.status === 200){
      dispatch(setInfo(data.data.data.user))
      localStorage.setItem('token',data.data.data.accessToken)
      localStorage.setItem('userInfo',JSON.stringify(data.data.data.user))
      Router.push('/')
    }else {
      alert('아이디 혹은 비밀번호를 확안해주세요.')
    }
  }

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
      <Form>
        <Label>아이디</Label>
        <TextInput
          type='text'
          onChange={handleId}
          onBlur={() => checkId()}
          isError={isIdError}
        />
        {
          isIdError ?
          <ErrorText>올바른 아이디 형식으로 입력해주세요.</ErrorText>
          : null
        }
        <Label>비밀번호</Label>
        <TextInput
          type='password' 
          onChange={handlePassword}
          onBlur={() => checkPassword()}
          isError={isPassError}
        />
        {
          isPassError ?
            <ErrorText>올바른 비밀번호 형식으로 입력해주세요.</ErrorText> 
            : null
        }
        <LoginButton
          onClick={() => login()}
          disabled={isIdError || isPassError || id.length === 0 || password.length === 0 }
        >
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const ErrorText = styled.p`
  margin-top : 8px;
  font-weight : 400;
  font-size : 13px;
  color : #ED4E5C;
  margin-bottom : 16px;
`

const Label = styled.h1`
  font-weight : 700;
  color : 6C6C7D;
  font-size : 13px;
`

const TextInput = styled.input<{isError:boolean}>`
  margin-top : 8px;
  padding : 16px;
  background : ${({isError}) => isError ? '#FDEDEE' : '#F7F7FA'};
  border-radius : 12px;
  margin-bottom : ${({isError}) => isError ? '0' : '16px'};
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;