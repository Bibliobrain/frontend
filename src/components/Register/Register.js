import React, { useEffect, useState } from 'react'
import { PanelContainer, Panel } from './Register.styles';
import { FormGroup, Label, Input, Message, Title, Button, FormGroupRow, InputContainer } from '../Form/Form.styles';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';

const RegisterPanel = () => {

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

        if (isEmpty(formData.firstname)) {
            errors.firstname = "Firstname can't be blank";
        } else if (isContainWhiteSpace(formData.firstname)) {
            errors.firstname = "Firstname should not contain white spaces";
        }

        if (isEmpty(formData.lastname)) {
            errors.lastname = "Last name can't be blank";
        } else if (isContainWhiteSpace(formData.lastname)) {
            errors.lastname = "Last name should not contain white spaces";
        }

        if (isEmpty(formData.ssn)) {
            errors.ssn = "SSN can't be blank";
        } else if (isContainWhiteSpace(formData.firstname)) {
            errors.ssn = "SSN should not contain white spaces";
        }

        if (isEmpty(formData.campus)) {
            errors.campus = "Campus can't be blank";
        } else if (isContainWhiteSpace(formData.campus)) {
            errors.campus = "Campus should not contain white spaces";
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
        <PanelContainer onSubmit={login}>
            <Panel >
                <Title >Register a new member</Title>
                <FormGroup>
                    <FormGroupRow>
                        <InputContainer>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input id="firstname" type="text" name="firstname" placeholder="Enter your firstname" onChange={handleInputChange} />
                            {errors.firstname &&
                                <Message>{errors.firstname}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" type="text" name="lastname" placeholder="Enter your lastname" onChange={handleInputChange} />
                            {errors.lastname &&
                                <Message>{errors.lastname}</Message>
                            }
                        </InputContainer>
                    </FormGroupRow>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="ssn">SSN</Label>
                    <Input id="ssn" type="text" name="ssn" placeholder="Enter your ssn" onChange={handleInputChange} />
                    {errors.ssn &&
                        <Message>{errors.ssn}</Message>
                    }
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="campus">Campus</Label>
                    <Input id="campus" type="text" name="campus" placeholder="Enter your campus" onChange={handleInputChange} />
                    {errors.campus &&
                        <Message>{errors.campus}</Message>
                    }
                </FormGroup>
                {/* <FormGroup>
                    <Label htmlFor="email">Professor</Label>
                    <Input id="email" type="text" name="email" placeholder="Are you a professor?" onChange={handleInputChange} />
                    {errors.email &&
                        <Message>{errors.email}</Message>
                    }
                </FormGroup> */}
                <Button type="submit" bsStyle="primary">Sign-In</Button>

            </Panel>
        </PanelContainer>
    )

}

export default RegisterPanel;