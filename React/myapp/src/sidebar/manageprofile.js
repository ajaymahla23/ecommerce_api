import axios from "axios";
import React, { useEffect, useState } from "react";
//import '../sidebar/mystyle.css';
import { Card, CardBody, FormGroup, Input, Label, Form, Col, Button } from "reactstrap";
import base_url from "../api/bootapi";

const ManageProfile = () => {
    const [shopDetailData, setShopDetail] = useState([]);

    useEffect(() => {
        document.title = "Manage Profile";
        getShopDetail();
    }, []);



    function getShopDetail(){
        axios.get(`${base_url}/manageprofile`).then
            (
                (response) => {
                    console.log(response.data);
                    //  Toast.success("courses has been loaded");
                    setShopDetail(response.data);
                },
                (error) => {
                    console.log(error);
                    //  Toast.success("something went wrong")
                }
            )

    }
    
    const submitbtn = {
        background: "#ffa500",
        border: "none"
    };
    return (
        <div>
            {shopDetailData.map((shopdetail, index) => (

                <Form className="form-padding" key={index} style={{ paddingLeft: '20px' }}>
                    <Card>
                        <CardBody>
                            <Card>
                                <div className="card-header bg-white">
                                    <h5>Basic Info</h5>
                                </div>
                                <CardBody>
                                    <FormGroup row>
                                        <Label sm={3}>Your name</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="name" value={shopdetail.shopName} required></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={3}>Your Password</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="password" id="password" required></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card><br />
                            <Card>
                                <div className="card-header bg-white">
                                    <h5>Payment Setting</h5>
                                </div>
                                <CardBody>
                                    <FormGroup row>
                                        <Label sm={3} className="switch" >USDT</Label>
                                        <Col sm={9}>
                                            <input type="checkbox" id="checkbox" checked />
                                            <div class="slider round"></div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={3}>USDT</Label>
                                        <Col sm={9}>
                                            <Input type="text" required placeholder="USDT" readOnly />
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card><br />
                            <Card>
                                <div className="card-header bg-white">
                                    <h5>Change your email</h5>
                                </div>
                                <CardBody>
                                    <FormGroup row>
                                        <Label sm={3}>Your email</Label>
                                        <Col sm={9}>
                                            <Input type="email" name="email" required></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card><br />
                            <Card>
                                <div className="card-header bg-white">
                                    <h5>Change your phone</h5>
                                </div>
                                <CardBody>
                                    <FormGroup row>
                                        <Label sm={3}>Your Phone</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="mobileNumber" minLength={10} maxLength={13} required></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card><br />

                            <div className="text-center mb-3">
                                <Button type="button" style={submitbtn}>Save Profile</Button>&nbsp;&nbsp;
                                <Button type="submit" style={submitbtn}>Update Profile</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Form>
            ))
            }
        </div>
    );
}
export default ManageProfile;