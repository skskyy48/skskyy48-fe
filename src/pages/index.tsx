import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { useDispatch } from 'react-redux';
import { setInfo, setIsLogin } from '../reducers/info';
import {NextPageContext} from 'next/types'
import axios from 'axios';
import MyHeader from '../components/MyHeader';

const HomePage: NextPage = () => {
  const [usePage,setUsePage] = useState<string|string[]>('1');
  const [products,setProducts] = useState([]);
  const [totalCount,setTotalCount] = useState(0);

  const router = useRouter();
  const { page } = router.query;
  const dispatch = useDispatch();
  
  useEffect(() => {
      if(typeof page !== 'undefined'){
        setUsePage(page)
      }
      
      getProducts()
      let token = localStorage.getItem('token');
      
      if(token !== null){
        let info = localStorage.getItem('userInfo');
        if(info !== null){
          let i = JSON.parse(info)
          dispatch(setInfo(i))
          dispatch(setIsLogin(true))
        }
      }
  }, [])

  useEffect(() => {
    getProducts()
  },[usePage])

  const getProducts = async() => {
    try {
      const data = await axios.get(`https://api.sixshop.com/products?page=${usePage}&size=10`)

      if(data.status === 200){
        setProducts(data.data.data.products)
        setTotalCount(data.data.data.totalCount)
      }else {
        router.push('/404')
      }
    } catch {
      router.push('/404')
    }
  }
  
  const onClickItem = (id:number) => {
    router.push({
      pathname : '/products/[id]',
      query : { id : id }
    })
  }

  return (
    <>
      <MyHeader />
      <Container>
        <ProductList products={products} clickItem={onClickItem}/>
        <Pagination page={Number(usePage)} setPage={setUsePage} total={totalCount}/>
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { page } = query;
  if(typeof page !== 'undefined') return { props: { page } };
  else return {props: {page : 1}}
};