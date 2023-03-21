import Link from 'next/link';
import type { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product } from '../../types/product';
import { useRouter } from 'next/router';
import axios from 'axios';
import { numberWithCommas } from '../../utilities';
import { useSelector } from 'react-redux';
import { RootState } from '../_app';
import MyHeader from '../../components/MyHeader';

const ProductDetailPage: NextPage = () => {
  const [product,setProduct] = useState<Product>({
    name : '',
    id : '',
    thumbnail : '',
    price : 0
  });
  const router = useRouter();
  const {id} = router.query
  const isLogin = useSelector((state:RootState) => state.info.isLogin)
  const user = useSelector((state:RootState) => state.info.name);

  useEffect(() => {
    if(typeof id !== 'undefined') getInfo(id.toString())
  },[])

  const getInfo = async (id:string) => {
    try {
      const data = await axios.get(`https://api.sixshop.com/products/${id}`)

      if(data.status === 200){
        setProduct(data.data.data.product)
      }else{
        router.push('/404')
      }
    } catch {
      router.push('/404')
    }
  }

  return (
    <>
      <MyHeader />
      <Thumbnail src={product?.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product?.name}</Name>
        <Price>{numberWithCommas(product?.price)}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id } = query;
  if(typeof id !== 'undefined') return { props: { id } };
  else return {props: {id : 1}}
};