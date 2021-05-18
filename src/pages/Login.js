import React, { useEffect, useState } from 'react'
import Form from '../components/Form/Form';
import styled from 'styled-components'
import bg from '../assets/bg.png';

export const Login = () => {


    const Background = styled.div`
  position:absolute;
  left:0;
  bottom:0;
  height: 100%;
  width: 100%;
  background-repeat: repeat;
  background-image: url(${bg});
  background-size:contain;
  background-position: center;
  z-index:-100;
`;

    return (
        <>
            <Background />
            <Form />
        </>
    )
}
