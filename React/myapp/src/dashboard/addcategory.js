import axios from "axios";
import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory() {

    const [name, setName] = useState('')
    const submitCategoryData = (e) => {
        debugger;
        e.preventDefault();
        const categoryData = { name: name };

        axios.post(`${base_url}/add_newcategory`, categoryData)
        .then((response) => {
            toast.success("Category added successfully!", {
              position: "top-right", // You can adjust the position
            //  autoClose: 3000, // Automatically close the toast after 3 seconds
            });
            console.log(response.data);
            console.log("success");
          })
          .catch((error) => {
            toast.error("An error occurred while adding the category.", {
              position: "top-right", // You can adjust the position
              autoClose: 3000, // Automatically close the toast after 3 seconds
            });
            console.log(error);
            console.log("error");
          });
    }

    return (
        <div className="container-fluid">
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label>Category Name</Label>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" className="form-control" />
                        </FormGroup>
                        <div style={{ float: 'right' }}>
                            <Button type="submit" onClick={(e) => submitCategoryData(e)} style={{ background: 'orange', border: 'none' }}>Submit</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
export default AddCategory;