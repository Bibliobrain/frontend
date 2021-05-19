import React, { useEffect, useState } from 'react'
import { PanelContainer, Panel } from './Register.styles';
import { FormGroup, Label, Input, Message, Title, Button, FormGroupRow, InputContainer } from '../Form/Form.styles';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../../shared/validator';
import MemberService from '../../requests/MemberService';
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

        if (isEmpty(formData.fname)) {
            errors.fname = "Firstname can't be blank";
        }

        if (isEmpty(formData.lname)) {
            errors.lname = "Last name can't be blank";
        }

        let sre = /^\d{10}$/gm;
        if (isEmpty(formData.ssn)) {
            errors.ssn = "SSN can't be blank";
        } else if (!sre.test(formData.ssn)) {
            errors.ssn = "Incorrect SSN";
        }

        if (isEmpty(formData.campus)) {
            errors.campus = "Campus can't be blank";
        }

        let re = /^[0-9\b]+$/;
        if (isEmpty(formData.phoneNumber)) {
            errors.phoneNumber = "Phone number can't be blank";
        } else if (!re.test(formData.phoneNumber)) {
            errors.phoneNumber = "Incorrect phone number";
        }

        if (isEmpty(formData.city)) {
            errors.city = "City can't be blank";
        }

        let zre = /^\d{4}$/gm;
        if (isEmpty(formData.zipCode)) {
            errors.zipCode = "Zip can't be blank";
        } else if (!zre.test(formData.zipCode)) {
            errors.zipCode = "Incorrect zip";
        }

        if (isEmpty(formData.address1)) {
            errors.address1 = "Addresss 1 can't be blank";
        }

        if (isEmpty(formData.address2)) {
            errors.address2 = "Addresss 2 can't be blank";
        }

        if (isEmpty(formData.address3)) {
            errors.address3 = "Addresss 3 can't be blank";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    const register = (e) => {
        e.preventDefault();
        let errors = validateLoginForm();
        if (errors === true) {
            let params = { ...formData }
            params.isProfessor = false
            MemberService.register(params).then(x => {
                alert(x)
            }).catch(err => {
                console.log(err)
            })
        } else {
            setErrors(errors)
            setFormSubmitted(true)
        }
    }

    return (
        <PanelContainer onSubmit={register}>
            <Panel >
                <Title >Register a new member</Title>
                <FormGroup>
                    <FormGroupRow>
                        <InputContainer>
                            <Label htmlFor="fname">First Name</Label>
                            <Input id="fname" type="text" name="fname" placeholder="Enter your firstname" onChange={handleInputChange} />
                            {errors.fname &&
                                <Message>{errors.fname}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="lname">Last Name</Label>
                            <Input id="lname" type="text" name="lname" placeholder="Enter your lastname" onChange={handleInputChange} />
                            {errors.lname &&
                                <Message>{errors.lname}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="ssn">SSN</Label>
                            <Input id="ssn" type="text" name="ssn" placeholder="0105008243" onChange={handleInputChange} />
                            {errors.ssn &&
                                <Message>{errors.ssn}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="phoneNumber">Phone number</Label>
                            <Input id="phoneNumber" type="text" name="phoneNumber" placeholder="00000000" onChange={handleInputChange} />
                            {errors.phoneNumber &&
                                <Message>{errors.phoneNumber}</Message>
                            }
                        </InputContainer>
                    </FormGroupRow>
                </FormGroup>
                <FormGroup>
                    <FormGroupRow>
                        <InputContainer>
                            <Label htmlFor="address1">Address 1</Label>
                            <Input id="address1" type="text" name="address1" placeholder="Enter your address1" onChange={handleInputChange} />
                            {errors.address1 &&
                                <Message>{errors.address1}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="address2">Address 2</Label>
                            <Input id="address2" type="text" name="address2" placeholder="Enter your address2" onChange={handleInputChange} />
                            {errors.address2 &&
                                <Message>{errors.address2}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="address3">Address 3</Label>
                            <Input id="address3" type="text" name="address3" placeholder="Enter your address3" onChange={handleInputChange} />
                            {errors.address3 &&
                                <Message>{errors.address3}</Message>
                            }
                        </InputContainer>
                    </FormGroupRow>
                </FormGroup>
                <FormGroup>
                    <FormGroupRow>
                        <InputContainer>
                            <Label htmlFor="campus">Campus</Label>
                            <Input id="campus" type="text" name="campus" placeholder="Engineering" onChange={handleInputChange} />
                            {errors.campus &&
                                <Message>{errors.campus}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" type="text" name="city" placeholder="Aalborg" onChange={handleInputChange} />
                            {errors.city &&
                                <Message>{errors.city}</Message>
                            }
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="zipCode">Zip</Label>
                            <Input id="zipCode" type="text" name="zipCode" placeholder="9000" onChange={handleInputChange} />
                            {errors.zipCode &&
                                <Message>{errors.zipCode}</Message>
                            }
                        </InputContainer>
                    </FormGroupRow>
                </FormGroup>
                <Button type="submit" bsStyle="primary">Sign-In</Button>

            </Panel>
        </PanelContainer>
    )

}

export default RegisterPanel;