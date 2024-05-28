import React, { useState } from "react";
import axios from 'axios';
import { Button, Card, CardBody, Col, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopSetting = () => {
    const [shopName, setShopName] = useState('')
    const [shopPhoneNo, setShopPhoneNo] = useState('')
    const [shopAddress, setShopAddress] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [shopEmail, setShopEmail] = useState('')
    const [shopLogofile, setShopLogofile] = useState('')

    const onFileChange = (event) => {
        // Update the selected file in the state
        setShopLogofile(event.target.files[0]);
    };

    function saveShopDetail() {

        if (setShopLogofile) {
            const formData = new FormData();
            formData.append("shopName", shopName);
            formData.append("shopPhoneNo", shopPhoneNo);
            formData.append("shopAddress", shopAddress);
            formData.append("introduction", introduction);
            formData.append("shopEmail", shopEmail);
            formData.append("shopLogofile", shopLogofile, shopLogofile.name);

            axios.post(`${base_url}/shopsetting`, formData)
            .then((response) => {
                toast.success("Shop added successfully!", {
                  position: "top-right",
                });
                console.log(response.data);
                console.log("success");
              })
              .catch((error) => {
                toast.error("An error occurred while adding the shop.", {
                  position: "top-right",
                });
                console.log(error);
                console.log("error");
              });
        } else {
            console.error("No file selected.");
        }
    }

    return (
        <div className="container-fluid">
            <div className="mb-2">
                <h5>
                    Shop Settings
                </h5>
            </div><br></br>
            <Card>
                <div className="card-header bg-white">
                    <h5>Basic Info</h5>
                </div>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label
                                for="shopName"
                                sm={2}>
                                Shop Name
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="shopName"
                                    name="shopName"
                                    placeholder="Shop Name"
                                    type="text" value={shopName} onChange={(e) => setShopName(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="phone"
                                sm={2}>
                                Shop Phone
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    type="number" value={shopPhoneNo} onChange={(e) => setShopPhoneNo(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="shopEmail"
                                sm={2} >
                                Shop email
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="shopEmail"
                                    name="shopEmail"
                                    placeholder="Email"
                                    type="email" value={shopEmail} onChange={(e) => setShopEmail(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="address"
                                sm={2}>
                                Shop Address
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                    type="text" value={shopAddress} onChange={(e) => setShopAddress(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="meta_description"
                                sm={2} >
                                Remarks
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="meta_description"
                                    name="meta_description"
                                    type="textarea" value={introduction} onChange={(e) => setIntroduction(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleFile"
                                sm={2}
                            >
                                Shop Logo
                            </Label>
                            <Col sm={10}>
                                <Input onChange={onFileChange}
                                    id="shoplogo"
                                    name="shoplogo"
                                    type="file" />
                            </Col>
                        </FormGroup>
                        <FormGroup
                            check row >
                            <Col
                                sm={{
                                    offset: 2,
                                    size: 10
                                }} >
                                <Button type="submit" className="btn" onClick={(e) => saveShopDetail(e)} style={{ background: '#ffa500', border: 'none', float: 'right' }}>
                                    Save
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>

            <Card className="mt-4">
                <div className="card-header bg-white">
                    <h5>Social Media Link</h5>
                </div>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={2}>
                                Facebook
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Facebook"
                                    type="email"
                                />
                                <FormText>
                                    Insert link with https
                                </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="examplePassword"
                                sm={2} >
                                Instagram
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Instagram"
                                    type="password" />
                                <FormText>
                                    Insert link with https
                                </FormText>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="examplePassword"
                                sm={2}>
                                Twitter
                            </Label>

                            <Col sm={10}>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Twitter"
                                    type="password" />
                                <FormText>
                                    Insert link with https
                                </FormText>
                            </Col>

                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="examplePassword"
                                sm={2} >
                                Google
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Google"
                                    type="password" />
                                <FormText>
                                    Insert link with https
                                </FormText>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="examplePassword"
                                sm={2} >
                                Youtube
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Youtube"
                                    type="password" />
                                <FormText>
                                    Insert link with https
                                </FormText>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
export default ShopSetting;