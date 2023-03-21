import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type PaginationProps = {
  page : number;
  setPage : Function;
  total : number;
}

const Pagination = ({page,setPage,total}:PaginationProps) => {
  const [ start,setStart] = useState(page-(page%5)+1)
  const [ end,setEnd] = useState(page-(page%5)+5)
  const numPages = Math.ceil(total/10)

  useEffect(() => {
    if(page%5 === 0)return;
    else{
      setStart(page-(page%5)+1)
      setEnd(page-(page%5)+5)
    }
  },[page])
  
  return (
    <Container>
      <Button
        onClick={() => {setPage(start-5)}} 
        disabled={start===1}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {[0, 1, 2, 3, 4].map((p) => {
          if(p+start <= numPages){
            return(
              <Page key={p} selected={(p+start) === page} disabled={(p+start) === page} onClick={() => setPage(p+start)}>
                {p+start}
              </Page>
            )
          }else return null
          })}
      </PageWrapper>
      <Button 
          onClick={() => {setPage(end+1)}} 
          disabled={page===numPages}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
