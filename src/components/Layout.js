import React from 'react';
import styled from 'styled-components'

export const Layout = (props) => {

  const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding:5rem;
  align-items: center;
  flex-direction: column;
  `;
  return (
    <>
      <PageContainer>
        {props.children}
      </PageContainer>
    </>
  )
}