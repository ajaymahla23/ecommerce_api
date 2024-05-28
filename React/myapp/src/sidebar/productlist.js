import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container, Table } from 'react-bootstrap';
import { ListCheck } from 'react-bootstrap-icons';
import base_url from '../api/bootapi';
import { Input } from 'reactstrap';

const ProductList = () => {

    const [productDetail, setProductDetail] = useState([]);

    useEffect(() => {
        document.title = "Products";
        getProductDetaildata();
    }, [])

    const getProductDetaildata = () => {
        debugger;
        axios.get(`${base_url}/productlist`)
            .then(
                (response) => {
                    console.log(response.data);
                    setProductDetail(response.data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <div className='container-fluid'>
            <span>Products</span>
            <a href="/productlibary" className="navbar-link">
                <Container className="d-flex justify-content-center align-items-center p-4">
                    <div style={{ height: '130px', width: '400px', textAlign: 'center', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ padding: '20px' }}>
                            <ListCheck style={{ fontSize: '40px' }} />
                        </div>
                        <p>Product Library</p>
                    </div>
                </Container>
            </a>
            <Card>
                <CardBody>
                    <h5>All Products</h5>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td></td>
                                <td>Category</td>
                                <td>Current qty</td>
                                <td>Unit Price</td>
                                <td>Discount Price</td>
                                <td>Purchase price</td>
                                <td>Estimated Profit</td>
                                <td>Published</td>
                                <td>Option</td>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetail.map(detail =>
                                <tr key={detail.productDetailId}>
                                    <td></td>
                                    <td>
                                        {detail.products.imageName && (
                                            <img style={{ borderRadius: '5px' }}
                                                src={`${base_url}/addproductimg/${detail.products.imageName}`}
                                                height="100" width="200" />
                                        )}
                                    </td>
                                    <td>{detail.products.remarks}</td>
                                    <td>{detail.products.category.name}</td>
                                    <td>{detail.products.qty}</td>
                                    <td>{detail.unitPrice}</td>
                                    <td>{detail.discountPrice}</td>
                                    <td>{detail.products.price}</td>
                                    <td>{detail.estimatedProfit}</td>
                                    <td>
                                        <div className="form-check form-switch">
                                            <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                                        </div>
                                    </td>
                                    <td>
                                         <a href={`/updateProduct/${detail.productDetailId}`}>Edit</a> 
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}

export default ProductList;