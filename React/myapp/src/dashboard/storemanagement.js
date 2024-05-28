import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "react-bootstrap";
import axios from 'axios';
import base_url from "../api/bootapi";
import { Button } from "reactstrap";
import { format } from "date-fns";


export default function StoreManagement() {
    const [shopVerification, setShopVerification] = useState([]);
    const [selectedShop, setSelectedShop] = useState([]);

    const toggleItem = (verifyId) => {
        if (selectedShop.includes(verifyId)) {
            // Deselect an item
            setSelectedShop(selectedShop.filter((id) => id !== verifyId));
        } else {
            // Select an item
            setSelectedShop([...selectedShop, verifyId]);
        }
    };

    function verifyShop() {

        const selectedVerfyId = shopVerification.filter(verify => selectedShop.includes(verify.id)).map(verify => verify.id);

        const data = { selectedVerfyId: selectedVerfyId };

        axios.post(`${base_url}/store_management/verification_status`, data).then(
            (response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        document.title = "Store Management";
        getStoreManagementData();
    }, [])

    const getStoreManagementData = () => {
        debugger;
        axios.get(`${base_url}/store_management`).then(
            (response) => {
                console.log("verify data :", response.data);
                setShopVerification(response.data);
            },
            (error) => {
                console.log(error);
            })
    }

    return (
        <div className="container-fluid">
            <Card>
                <CardBody>
                    <h5>Store Management</h5>
                    <hr />
                    <Table>
                        <thead>
                            <tr style={{ fontWeight: '450' }}>
                                <td>#</td>
                                <td>Store id</td>
                                <td>Date</td>
                                <td>Store Name</td>
                                <td>Phone No.</td>
                                <td>Shop email</td>
                                <td>Store Logo</td>
                                <td>Remarks</td>
                                <td>user name</td>
                                <td>Document</td>
                                <td>Status</td>
                                <td>select checkbox status</td>
                                <td>Operate</td>
                            </tr>
                        </thead>
                        <tbody>
                            {shopVerification.map((verify, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{verify.shopId}</td>
                                    <td>{format(new Date(verify.date), 'dd-MM-yyyy')}</td>
                                    <td>{verify.shopName}</td>
                                    <td>{verify.shopPhoneNo}</td>
                                    <td>{verify.shopEmail}</td>
                                    <td>
                                        {verify.shoplogo && (
                                            <img style={{ borderRadius: '5px' }}
                                                src={`${base_url}/shoplogo/${verify.shoplogo}`}
                                                height="100" width="200" />
                                        )}
                                    </td>
                                    <td>{verify.shopIntro}</td>
                                    <td>{verify.userName}</td>
                                    <td>
                                        {verify.validIdDoc && (
                                            <a style={{ textDecoration: 'none' }}
                                                href={`${base_url}/store_management/download/${verify.id}`}>view</a>
                                        )}
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedShop.includes(verify.id)}
                                            onChange={() => toggleItem(verify.id)}
                                            disabled={verify.verifyStatus === 'Y'}
                                        />
                                    </td>

                                    <td>
                                        {verify.verifyStatus === 'Y' ? (
                                            <Button style={{ background: 'white', border: 'none', color: 'green', fontWeight: 'bold' }}>
                                                Verified
                                            </Button>
                                        ) : (
                                            <Button style={{ background: 'white', border: 'none', color: 'red', fontWeight: 'bold' }} onClick={verifyShop}>
                                                Un-verified
                                            </Button>
                                        )}</td>

                                    <td>edit</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}