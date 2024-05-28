import React, { useState } from "react";
import axios from 'axios';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label } from "reactstrap";
import base_url from "../api/bootapi";



export default function ShopVerification() {
    const [userName, setUserName] = useState('')
    const [address, setAddress] = useState('')
    const [passportCountry, setPassportCountry] = useState('')
    const [verificationfile, setVerificationFile] = useState('')

    const onFileChange = (event) => {
        // Update the selected file in the state
        setVerificationFile(event.target.files[0]);
    };

    function saveShopVerification() {

        if (setVerificationFile) {
            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("passportCountry", passportCountry);
            formData.append("address", address);
            formData.append("verificationfile", verificationfile, verificationfile.name);

            axios.post(`${base_url}/storeverification`, formData).then(
                (response) => {
                    console.log(response.data);
                    setVerificationFile(response.data);
                }, (error) => {
                    console.log("error", error);
                }
            )
        } else {
            console.error("No file selected.");
        }
    }
    return (
        <div className="container-fluid">
            <div className="mb-2">
                <h5>
                    Shop Verification
                </h5>
            </div><br></br>
            <Card>
                <div className="card-header bg-white">
                    <h5>Verification Info</h5>
                </div>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label
                                sm={2}>
                                Full Name
                            </Label>
                            <Col sm={10}>
                                <Input
                                    placeholder="Full Name" required
                                    type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                sm={2}>
                                Passport country
                            </Label>
                            <Col sm={10}>
                                <Input
                                    placeholder="Passport country" required
                                    type="text" value={passportCountry} onChange={(e) => setPassportCountry(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                sm={2}
                            >
                                Your living address
                            </Label>
                            <Col sm={10}>
                                <Input
                                    placeholder="Your living address" required
                                    type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="exampleFile"
                                sm={2}
                            >
                                Valid ID (driver's license or ID card)
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="myFile" name="myFile" onChange={onFileChange}
                                    type="file" required />

                            </Col>
                        </FormGroup>

                        <FormGroup
                            check
                            row
                        >
                            <Col
                                sm={{
                                    offset: 2,
                                    size: 10
                                }} >
                                <Button type="submit" className="btn" onClick={saveShopVerification} style={{ background: '#ffa500', border: 'none', float: 'right' }}>
                                    Apply
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>





        </div>
    );
}