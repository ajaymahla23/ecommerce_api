import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container, Table } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import axios from "axios";
import base_url from "../api/bootapi";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Input, InputGroup, InputGroupText } from 'reactstrap';

const Productlibrary = () => {

    const [productlibrary, setproductlibrary] = useState([]);
    // checbox
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    // popup form
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleSelectAll = () => {
        debugger;
        setSelectAll(!selectAll);

        if (!selectAll) {
            // Select all items
            setSelectedItems(productlibrary.map((product) => product.id));
        } else {
            // Deselect all items
            setSelectedItems([]);
        }
    };

    const toggleItem = (productId) => {
        if (selectedItems.includes(productId)) {
            // Deselect an item
            setSelectedItems(selectedItems.filter((id) => id !== productId));
        } else {
            // Select an item
            setSelectedItems([...selectedItems, productId]);
        }
    };

    const sendProductsOfUser = () => {
        const markupPercentage = document.getElementById('markupPercentage').value;
        // Get the IDs of the selected products
        const selectedProductIds = productlibrary.filter(product => selectedItems.includes(product.id)).map(product => product.id);
        const data = {
            markupPercentage: markupPercentage,
            selectedProductIds: selectedProductIds
        };

        axios.post(`${base_url}/checkboxesClicked`, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        handleClose();
    };


    useEffect(() => {
        document.title = "Product Library"
        getProuductLibraryData();
    }, [])

    // Get Product List
    const getProuductLibraryData = () => {
        axios.get(`${base_url}/productLibrary`)
            .then(
                (response) => {
                    console.log(response.data);
                    setproductlibrary(response.data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <div className='container-fluid'>
            <span>Products</span>
            <Container className="d-flex justify-content-center align-items-center p-4">
                <div style={{ height: '130px', width: '400px', textAlign: 'center', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>
                    <div style={{ padding: '20px' }}>
                        <PlusCircle style={{ fontSize: '40px' }} />
                    </div>
                    <p >Product Library-All products</p>
                </div></Container>
            <Card>
                <CardBody>
                    <div>
                        <div className='col-md-12 row'>
                            <div className='col-md-6'>
                                <h5>All Products</h5>
                            </div>
                            <div className='col-md-6'>
                                <Button variant="primary" onClick={handleShow} style={{ float: 'right' }}>
                                    Publish products to the store in bulk
                                </Button>
                            </div>
                        </div>
                        <hr />
                        <Table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td> <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={toggleSelectAll}
                                    /></td>
                                    <td>Name</td>
                                    <td></td>
                                    <td>Category</td>
                                    <td>Qty</td>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {productlibrary.map(product =>
                                    <tr key={product.id}>
                                        <td></td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(product.id)}
                                                onChange={() => toggleItem(product.id)} />
                                        </td>
                                        <td>
                                            {product.imageName && (
                                                <img style={{ borderRadius: '5px' }}
                                                    src={`${base_url}/addproductimg/${product.imageName}`}
                                                    height="100" width="200" />
                                            )}
                                        </td>
                                        {/* <td>{product.name}</td> */}
                                        <td style={{ whiteSpace: 'wrap' }}>{product.remarks}</td>
                                        <td>{product.category.name}</td>
                                        <td>{product.qty}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>


            {/* pop up form */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Publish products to the store in bulk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <InputGroup>
                                <Input type='number' min={1} id='markupPercentage' />
                                <InputGroupText>
                                    %
                                </InputGroupText>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Post The Selected Products To Your Store And Fill In The Price Of The Product. The Recommended Ratio Is 5%To 20%.</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ background: 'orange', border: 'none' }} onClick={sendProductsOfUser}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Productlibrary;