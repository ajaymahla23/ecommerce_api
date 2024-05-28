import React, { useEffect, useState } from "react";
import '../css/wallet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CurrencyDollar, PlusCircleFill } from 'react-bootstrap-icons';
import { Card, CardBody, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { format } from 'date-fns';

export default function Wallet() {
    const [selectedFile, setSelectedFile] = useState(null);

    //recharge popup form
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Withdraw pop form
    const [openWithdrawReq, setOpenWithdrawReq] = useState(false);
    const showWithdrawReq = () => setOpenWithdrawReq(true);
    const withdrawReqClose = () => setOpenWithdrawReq(false);

    // data
    const [walletHistory, setWalletHistory] = useState({ rechargeHistory: [], withdrawalHistory: [] });



    const onFileChange = (event) => {
        // Update the selected file in the state
        setSelectedFile(event.target.files[0]);
    };


    function AddRechargeByShop() {
        const amountByUser = document.getElementById('amountByUser').value;

        // Create a FormData object
        if (selectedFile) {
            const formData = new FormData();
            formData.append('amountByUser', amountByUser);
            formData.append('walletImg', selectedFile, selectedFile.name);
            console.log(formData);
            axios.post(`${base_url}/recharge_wallet`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.error("No file selected");
        }
    }

    function AddWithdrawReq() {
        const withdraw_req = document.getElementById('withdraw_req').value;

        const withdraw_reqData = new FormData();
        withdraw_reqData.append('withdraw_req', withdraw_req);
        axios.post(`${base_url}/send_withdraw_req`, withdraw_reqData).then(response => {
            console.log(response.data);
        })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        document.title = "Wallet";
        getWalletHistory();
    }, []);

    const getWalletHistory = () => {
        axios.get(`${base_url}/wallet`)
            .then(
                (response) => {
                    console.log(response.data);
                    setWalletHistory(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    return (
        <div className="container-fluid">
            <header>Wallet</header>
            <div className="row">
                <div className="col-lg-6">
                    <div className="col-lg-6">
                        <div className="box"><CurrencyDollar /> <p>Wallet Balance</p></div>
                    </div>
                    <div className="col-lg-6" onClick={handleShow}>
                        <div className="box"><PlusCircleFill /> <p>Offline Recharge Wallet</p></div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="col-lg-6">
                        <div className="box"><CurrencyDollar /> <p>Pending Balance</p></div>
                    </div>
                    <div className="col-lg-6" onClick={showWithdrawReq}>
                        <div className="box"><PlusCircleFill /> <p>Send Withdraw Request</p></div>
                    </div>
                </div>
            </div>

            {/*Wallet Balance pop up form */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <div className="col-md-4" style={{ background: '#D3D3D3' }}>
                                <h6 className="card-title mt-1">Offline Recharge Wallet</h6>
                                <p className="card-text" style={{ fontWeight: 'bold' }}>Recharge Method</p>
                                <h5 className="card-text" style={{ color: '#212529', background: 'white' }}>USD(TRC)</h5>
                            </div>
                            <div className="col-md-8">
                                <h5>Wallet address</h5>
                                <Form>
                                    <div className="form-group mt-4">
                                        <label style={{ fontWeight: '500' }}>Amount</label>
                                        <input type="number" min={1} className="form-control" required name="amountByUser" id="amountByUser" placeholder="Amount" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label style={{ fontWeight: '500' }}>Photo</label>
                                        <input type="file" className="form-control-file" required name="walletImg" id="walletImg" onChange={onFileChange} />
                                    </div>
                                    <hr />
                                    <div style={{ float: 'right' }}>
                                        <Button style={{ background: '#FFA500', border: 'none' }} type="submit" onClick={AddRechargeByShop}>
                                            Confirm
                                        </Button><span>&nbsp;</span>
                                        <Button style={{ background: '#FFA500', border: 'none' }} onClick={handleClose}>
                                            Close
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            {/*Withdraw Req pop up form */}
            <Modal show={openWithdrawReq} onHide={withdrawReqClose}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <div className="col-md-4" style={{ background: '#D3D3D3' }}>
                                <h6 className="card-title mt-1">Withdraw Request</h6>
                                <p className="card-text" style={{ fontWeight: 'bold' }}>Withdrawal method</p>
                                <h5 className="card-text" style={{ color: '#212529', background: 'white' }}>USD(TRC)</h5>
                            </div>
                            <div className="col-md-8">
                                <Form>
                                    <div className="form-group mt-4">
                                        <label style={{ fontWeight: '500' }}>Amount</label>
                                        <input type="number" min={1} className="form-control" required name="withdraw_req" id="withdraw_req" placeholder="Amount" />
                                    </div>
                                    <hr />
                                    <div style={{ float: 'right' }}>
                                        <Button style={{ background: '#FFA500', border: 'none' }} type="submit" onClick={AddWithdrawReq}>
                                            Confirm
                                        </Button><span>&nbsp;</span>
                                        <Button style={{ background: '#FFA500', border: 'none' }} onClick={withdrawReqClose}>
                                            Close
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            <Card>
                <CardBody>
                    <h5>Wallet Recharge History</h5>
                    <hr />
                    <Table borderless>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Order Number</td>
                                <td>Date</td>
                                <td>Amount</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {walletHistory.rechargeHistory.map(rech_history => (
                                <tr key={rech_history.id}>
                                    <td></td>
                                    <td>{rech_history.id}</td>
                                    <td>{format(new Date(rech_history.date), 'dd-MM-yyyy')}</td> 
                                    <td>{rech_history.amountByUser}</td>
                                    <td>{rech_history.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <br />

            <Card>
                <CardBody>
                    <h5>Withdrawl Request History</h5>
                    <hr />
                    <Table borderless>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Withdrawl Request Id</td>
                                <td>Date</td>
                                <td>Amount</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            {walletHistory.withdrawalHistory.map(withdrawal => (
                                <tr key={withdrawal.id}>
                                    <td></td>
                                    <td>{withdrawal.id}</td>
                                    <td>{format(new Date(withdrawal.date), 'dd-MM-yyyy')}</td> 
                                    <td>{withdrawal.withdrawAmout}</td>
                                    <td>{withdrawal.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}