import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "react-bootstrap";
import axios from 'axios';
import base_url from "../api/bootapi";
import { Button, Input } from "reactstrap";
import { format } from "date-fns";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function RechargeManagement() {
    const [rechargeManagement, setRechargeManagement] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({}); // Store data to display in the modal

    // Function to open the modal and set the data
    const openModal = (userId, email, amount) => {
        setModalData({ userId, email, amount });
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    function approvedAmtRequest() {
        const rechargeId = modalData.userId;

        const formData = new FormData();
        formData.append('rechargeId', rechargeId);

        axios.post(`${base_url}/addAmountOnWallet`, formData).then(
            (response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        document.title = "Recharge Management";
        getRechargeManagementData();
    }, [])

    const getRechargeManagementData = () => {
        debugger;
        axios.get(`${base_url}/recharge_management`).then(
            (response) => {
                console.log("recharge_management data :", response.data);
                setRechargeManagement(response.data);
            },
            (error) => {
                console.log(error);
            })
    }

    return (
        <div className="container-fluid">
            <Card>
                <CardBody>
                    <h5>Recharge Management</h5>
                    <hr />
                    <Table>
                        <thead>
                            <tr style={{ fontWeight: '450' }}>
                                <td>#</td>
                                <td>Recharge id</td>
                                <td>Date</td>
                                <td>Username</td>
                                <td>User Type</td>
                                <td>Full Name</td>
                                <td>Currency</td>
                                <td>Recharge Amount</td>
                                <td>Recharge Type</td>
                                <td>Recharge Image</td>
                                <td>Approval Status</td>
                                <td>Operate</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rechargeManagement.map((recharge, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{recharge.id}</td>
                                    <td>{format(new Date(recharge.date), 'dd-MM-yyyy')}</td>
                                    <td>{recharge.userEmail}</td>
                                    <td>{recharge.roleType == 'S' ? 'Seller' : 'User'}</td>
                                    <td>{recharge.firstName}</td>
                                    <td>{recharge.currecy}</td>
                                    <td>{recharge.amountByUser}</td>
                                    <td>{recharge.rechargeType}</td>
                                    <td>
                                        {recharge.imageScreenshot && (
                                            <a target="_blank" title="click"
                                                href={`${base_url}/addAmtByUser/${recharge.imageScreenshot}`}>
                                                <img style={{ borderRadius: '25px' }}
                                                    src={`${base_url}/addAmtByUser/${recharge.imageScreenshot}`}
                                                    height="50" width="50" /></a>
                                        )}
                                    </td>
                                    <td>
                                        {recharge.status === 'P' ? (
                                            <span style={{ color: 'green' }}>Pass</span>) : (
                                            <span style={{ color: 'red' }}>To be review</span>
                                        )}
                                    </td>
                                    <td>
                                        {recharge.status === 'U' && (
                                            <button
                                                onClick={() =>
                                                    openModal(
                                                        recharge.id,
                                                        recharge.userEmail,
                                                        recharge.amountByUser
                                                    )
                                                }
                                                className="editbutton"
                                                style={{ backgroundColor: 'orangered', border: 'none', color: 'white', borderRadius: '4px' }}
                                            >
                                                Add Amount
                                            </button>
                                        )}

                                        {recharge.status === 'P' && (
                                            <button
                                                style={{ backgroundColor: '#3CB371', border: 'none', color: 'white', borderRadius: '4px' }}
                                            >
                                                Approved
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

            {/* Render the modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2>Add Amount</h2>
                <p>Recharge ID: {modalData.userId}</p>
                <p>Email: {modalData.email}</p>
                <p>Amount: {modalData.amount}</p>
                <button onClick={closeModal}>Close</button>
                <button onClick={approvedAmtRequest}>Approved</button>
            </Modal>
        </div>
    )
}