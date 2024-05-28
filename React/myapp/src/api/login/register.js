import axios from "axios";
import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import base_url from "../bootapi";

function Register() {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')


    const saveNewRegister = (e) => {
        debugger;
        e.preventDefault();

        //  const userData = [firstName, email,mobileNumber, password]
        const userData = {
            firstName: firstName,
            email: email,
            mobileNumber: mobileNumber,
            password: password
        };

        axios.post(`${base_url}/register`, userData).then(
            (response) => {
                console.log(response.userData);
                console.log("success");
            },
            (error) => {
                console.log(error)
                console.log("error");
            }
        )
    }
    return (
        <div className="container">
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="firstName">
                                Name
                            </Label>
                            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                type="text" id="firstName" name="fistName" required
                                placeholder="Full Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">
                                Email id
                            </Label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)}
                                type="email" required minlength="6" name="email"
                                id="email" placeholder="Enter your email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mobileNumber">
                                Mobile Number
                            </Label>
                            <Input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                                type="tel" required name="mobileNumber"
                                minlength="10" maxLength="13" id="mobileNumber" placeholder="Enter your number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)}
                                type="password" id="password" name="password"
                                required placeholder="Minimum 6 characters" minLength={6}
                            />
                        </FormGroup>



                        <Button type="submit" onClick={(e) => saveNewRegister(e)}>
                            Continue
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
export default Register;