import axios from "axios";
import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import base_url from "../bootapi";

function Login() {
    debugger;
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const checkUser=(e)=>{
        e.preventDefault();
       const logindata={email, password};

       axios.get(`${base_url}`,logindata)  
       .then(response => {
        if (response.data.status === 'success') {
            // User logged in successfully
            // You can redirect the user to another page here
        } else {
            // Login failed
            // You can show an error message here
        }
    })
    .catch(error => {
        console.error("There was an error!", error);
    });
    }

    return (
        <div className="container">
            <Card>
                <CardBody>
                    <Form>

                        <FormGroup>
                            <Label for="email">
                                Email id
                            </Label>
                            <Input value={email} onChange={(e)=> setEmail(e.target.value)}
                                type="email" required minlength="6" name="email"
                                id="email" placeholder="Enter your email"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input value={password} onChange={(e)=>setPassword(e.target.value)}
                                type="password" id="password" name="password"
                                required placeholder="Minimum 6 characters" minLength={6}
                            />
                        </FormGroup>
                        <Button type="submit" onClick={(e)=>checkUser(e)}>
                            Continue
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
export default Login;