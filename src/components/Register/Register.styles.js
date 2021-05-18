import React from 'react';
import styled from "styled-components";

export const PanelContainer = styled.form`
display: flex;
/* background-color:red; */
border-radius:5px;
flex-direction: row;
max-width: 1300px;
width: 100%;
`;

export const Panel = styled.div`
display: flex;
background-color:rgb(14,51,62);
padding: 30px 30px 30px 30px;
border-radius:5px;
align-items: center;
flex-direction: column;
margin:0px 20px 0px 20px;
width: 100%;
`;