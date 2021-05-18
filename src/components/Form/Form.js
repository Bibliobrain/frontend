import React, { useEffect, useState } from 'react'
import { FormGroup, Label, Input, Message, Title, FormContainer,Button } from './Form.styles';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';

const Form = () => {

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
        <FormContainer onSubmit={login}>
            <Title >Log in to GTL</Title>
            <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" name="email" placeholder="Enter your email" onChange={handleInputChange} />
                {errors.email &&
                    <Message>{errors.email}</Message>
                }
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Password</Label>
                <Input id="password" type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                {errors.password &&
                    <Message>{errors.password}</Message>
                }
            </FormGroup>
            <Button type="submit" bsStyle="primary">Sign-In</Button>
        </FormContainer>
    )

}

export default Form;