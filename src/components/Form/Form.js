import React, { useContext, useState } from 'react'
import { FormGroup, Label, Input, Message, Title, FormContainer, Button } from './Form.styles';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';
import { AuthContext } from '../../contexts/AuthContext'

const Form = () => {
    const [formData, setFormData] = useState({}) // Contains login form data
    const [errors, setErrors] = useState({}) // Contains login field errors
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const authContext = useContext(AuthContext)

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        formData[name] = value;
        setFormData(formData)
    }

    const validateLoginForm = (e) => {
        let errors = {};
        if (isEmpty(formData.ssn)) {
            errors.ssn = "SSN can't be blank";
        } else if (isContainWhiteSpace(formData.ssn)) {
            errors.ssn = "SSN should not contain white spaces";
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
            authContext.loginRequest(formData.ssn, formData.password)
        } else {
            setErrors(errors)
            setFormSubmitted(true)
        }
    }

    return (
        <FormContainer onSubmit={login}>
            <Title >Log in to GTL</Title>
            <FormGroup>
                <Label htmlFor="email">SSN</Label>
                <Input id="ssn" type="text" name="ssn" placeholder="Enter your SSN" onChange={handleInputChange} />
                {errors.ssn &&
                    <Message>{errors.ssn}</Message>
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