import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, CardBody, Col, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import base_url from "../../api/bootapi";
import { useParams } from "react-router-dom";



const EditProductForm = () => {
    debugger;
    const { productDetailId } = useParams();
    const [formData, setFormData] = useState({}); // Initialize with empty form data

    useEffect(() => {
        axios.get(`${base_url}/updateProduct/${productDetailId}`)
            .then((response) => {
                const productData = response.data; // Fetched product data
    
                // Assuming your productData object contains fields like "name", "unitPrice", "discountPrice", etc.
                setFormData({
                    name: productData.name,
                    unitPrice: productData.unitPrice,
                    discountPrice: productData.discountPrice,
                    // Add other fields as needed
                });
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [productDetailId]);
    

    // Handle form submission to update the product data on the backend

    const AddNewDiscount = () => {
        const discount = document.getElementById('discount').value;
        const data = { discount: discount }
        axios.post(`${base_url}/update_discount`, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        //   <div>

        //      <h1>Edit Product: {formData.name}</h1> 
        //     <form>
        //       {/* Create form fields for editing the product data */}
        //       {/* Example: */}
        //       {/* <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /> */}
        //       {/* Add other form fields here for editing other product details */}
        //       <button type="submit">Save</button>
        //     </form>
        //   </div>
        <div className="container-fluid">
            <div className="mb-2">
                <h5>
                    Update Your Product
                </h5>
            </div><br></br>
            <Card>
                <div className="card-header bg-white">
                    <h5>Product price + stock</h5>
                </div>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label
                                for="shopName"
                                sm={2}>
                                Purchase price
                            </Label>
                            <Col sm={10}>
                                <Input
                                    placeholder="Purchase price"
                                    type="text" value={formData.unitPrice} onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="discount"
                                sm={2}
                            >
                                Discount
                            </Label>
                            <Col sm={10}>
                                <Input
                                    placeholder="Discount"
                                    type="number" id="discount" min={1}
                                />
                            </Col>
                        </FormGroup>
                        {/* <FormGroup row>
                    <Label
                        for="phone"
                        sm={2}>
                        Unit Price
                    </Label>
                    <Col sm={10}>
                        <Input
                            placeholder="Unit Price"
                            type="number" value={shopPhoneNo} onChange={(e) => setShopPhoneNo(e.target.value)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label
                        for="shopEmail"
                        sm={2}
                    >
                       Discount
                    </Label>
                    <Col sm={10}>
                        <Input
                           
                            placeholder="Discount"
                            type="email" value={shopEmail} onChange={(e) => setShopEmail(e.target.value)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label
                        for="address"
                        sm={2}
                    >
                       Estimated Profit
                    </Label>
                    <Col sm={10}>
                        <Input
                           
                            placeholder="Estimated Profit"
                            type="text" value={shopAddress} onChange={(e) => setShopAddress(e.target.value)}
                        />
                    </Col>
                </FormGroup>


                <FormGroup row>
                    <Label
                        for="meta_description"
                        sm={2}
                    >
                        Remarks
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="textarea" value={introduction} onChange={(e) => setIntroduction(e.target.value)}
                        />
                    </Col>
                </FormGroup>
               */}

                        <FormGroup
                            check
                            row
                        >
                            <Col
                                sm={{
                                    offset: 2,
                                    size: 10
                                }} >
                                <Button type="submit" className="btn" onClick={AddNewDiscount} style={{ background: '#ffa500', border: 'none', float: 'right' }}>
                                    Add Discount
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>





        </div>
    );
}
export default EditProductForm;