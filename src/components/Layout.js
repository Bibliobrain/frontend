import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components'

export const Layout = (props) => {

  const PageContainer = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `;

  return (
    <PageContainer>
      {props.children}
    </PageContainer>
  )
}