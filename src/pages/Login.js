import React, { useEffect, useState } from 'react'
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../shared/validator';
import styled from 'styled-components'

export const Login = () => {

    const FormContainer = styled.div`
      display: flex;
      padding: 20px;
      background-color:rgb(14,51,62);
      border-radius:5px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      `;


    const [formData, setFormData] = useState({}) // Contains login form data
    const [errors, setErrors] = useState({}) // Contains login field errors
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        formData[name] = value;
        setFormData(formData)
    }

    const validateLoginForm = (e) => {
        let errors = {};
        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    const login = (e) => {
        e.preventDefault();
        let errors = validateLoginForm();

        if (errors === true) {
            alert("You are successfully signed in...");
            window.location.reload()
        } else {
            setErrors(errors)
            setFormSubmitted(true)
        }
    }

    return (
        <FormContainer>
            <form onSubmit={login}>
                <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="text" name="email" placeholder="Enter your email" onChange={handleInputChange} />
                    {errors.email &&
                        <Form.Text color='white' style={{fontColor:'white'}}>{errors.email}</Form.Text>
                    }
                </FormGroup>
                <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                    {errors.password &&
                        <Form.Text>{errors.password}</Form.Text>
                    }
                </FormGroup>
                <Button type="submit" bsStyle="primary">Sign-In</Button>
            </form>
        </FormContainer>
    )

}
