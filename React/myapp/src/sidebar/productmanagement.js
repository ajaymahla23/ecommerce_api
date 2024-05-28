import axios from 'axios';
import base_url from "../api/bootapi";
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";

function ProducManagement() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState(null)
    const [remarks, setRemarks] = useState(null)
    const [price, setPrice] = useState(null)
    const [qty, setQty] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [category, setCategory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    const onFileChange = (event) => {
        // Update the selected file in the state
        setSelectedFile(event.target.files[0]);
    };

    // view image
    // const onFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedImage(file);
    // };

    const saveProductData = () => {
        // Check if a file is selected
        debugger;
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile, selectedFile.name); // Use 'file' instead of 'myFile'
            formData.append("name", name);
            formData.append("remarks", remarks);
            formData.append("price", price);
            formData.append("qty", qty);
            formData.append("selectedCategory", selectedCategory);

            // Details of the uploaded file
            console.log("selectedCategory", selectedCategory);
            console.log(selectedFile);

            // Send the formData object to the backend API
            axios.post(`${base_url}/addproduct`, formData)
                .then((response) => {
                    console.log("Response from the API:", response.data);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
        } else {
            console.error("No file selected.");
        }
    };

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue); // Update selectedCategory when the user selects a category
        console.log('Selected Category:', selectedValue); // Add a log statement to see the selected category
    }

    useEffect(() => {
        document.title = "Product"
        getCategoryData();
    }, [])

    const getCategoryData = () => {
        axios.get(`${base_url}/category_management`)
            .then(
                (response) => {
                    console.log('Category Data:', response.data); // Add a log statement to see the category data
                    setCategory(response.data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <div className='container-fluid'>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label>Category</Label>
                            <select value={selectedCategory} onChange={handleCategoryChange} className="form-control" required>
                                <option>--select category--</option>
                                {category.map((cate) => (
                                    <option key={cate.categoryId} value={cate.categoryId}>
                                        {cate.name}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Product Name</Label>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter Name' className='form-control' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Product Detail</Label>
                            <textarea type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} required placeholder='Enter Detail' className='form-control' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Product Qty</Label>
                            <Input type="number" value={qty} onChange={(e) => setQty(e.target.value)} required placeholder='Enter Qty' min={1} className='form-control' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Product Amount</Label>
                            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder='Enter Amount' min={1} className='form-control' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Photo</Label>
                            <div>
                                <input type="file" onChange={onFileChange} required />
                            </div>

                            {/* {selectedImage && (
                                <img className='mt-3'
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    width={220}
                                />
                            )} */}
                        </FormGroup>
                        <Button type="submit" onClick={saveProductData} style={{ background: 'orange', border: 'none', float: 'right' }}>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default ProducManagement;
