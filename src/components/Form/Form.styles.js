import React from 'react';
import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    padding: 30px 30px 30px 30px;
    background-color:rgb(14,51,62);
    min-width:400px;
    border-radius:5px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const FormGroup = styled.div`
	color: palevioletred;
    display: block;
    width: 100%;
	margin: 20px auto;
`;


export const Title = styled.label`
	margin-bottom: 0.5em;
	color: white;
    display: block;
    font-size:28px;
    font-weight:bold;
`;

export const Label = styled.label`
	margin-bottom: 0.5em;
	color: white;
    display: block;
`;


export const Input = styled.input`
	padding: 0.5em;
	color: rgb(14,51,62);
	background: white;
	border: none;
	border-radius: 3px;
	width: 100%;
	/* margin-bottom: 0.5em; */
`;

export const Button = styled.button`
    width: 100%;
	border-radius: 3px;
    background-color: red;
    color: white;
    padding: '10px 28px';
    font-size: '18px';
    outline: none; 
    cursor: pointer;
    border: none;
    font-weight:bold;
    padding: 10px 20px;
    transition: all .5s ease;
    &:hover{
        background-color:  green;  
        color: white;
    }
`;

export const Message = styled.label`
	margin-bottom: 0.5em;
	color: red;
    display: block;
`;
