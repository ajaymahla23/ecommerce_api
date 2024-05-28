import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "react-bootstrap";
import axios from 'axios';
import base_url from "../api/bootapi";
import { Button, Input } from "reactstrap";
import { format } from "date-fns";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function WithdrawReqManagement() {
    const [withdrawalReqManagement, setWithdrawalReqManagement] = useState([]);

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

    function approvedWithdrwalReqAmt() {
        const withdrawalId = modalData.userId;

        const formData = new FormData();
        formData.append('withdrawalId', withdrawalId);

        axios.post(`${base_url}/addAmountforWithdraw`, formData).then(
            (response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        document.title = "Withdrwal Request Management";
        getWithdrawalManagementData();
    }, [])

    const getWithdrawalManagementData = () => {
        debugger;
        axios.get(`${base_url}/withdraw_request`).then(
            (response) => {
                console.log("withdraw_request data :", response.data);
                setWithdrawalReqManagement(response.data);
            },
            (error) => {
                console.log(error);
            })
    }

    return (
        <div className="container-fluid">
            <Card>
                <CardBody>
                    <h5>Withdrawal Request Detail</h5>
                    <hr />
                    <Table>
                        <thead>
                            <tr style={{ fontWeight: '450' }}>
                                <td>#</td>
                                <td>Withdraw Request Id</td>
                                <td>Date</td>
                                <td>Username</td>
                                <td>User Type</td>
                                <td>Currency</td>
                                <td>Withdraw Req Amount</td>
                                <td>Approval Status</td>
                                <td>Operate</td>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalReqManagement.map((withdrawal, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{withdrawal.id}</td>
                                    <td>{format(new Date(withdrawal.date), 'dd-MM-yyyy')}</td>
                                    <td>{withdrawal.userEmail}</td>
                                    <td>{withdrawal.roleType == 'S' ? 'Seller' : 'User'}</td>
                                    <td>{withdrawal.currecy}</td>
                                    <td>{withdrawal.withdrawAmout}</td>
                                   
                                    <td>
                                        {withdrawal.status === 'A' ? (
                                            <span style={{ color: 'green' }}>Pass</span>) : (
                                            <span style={{ color: 'red' }}>To be review</span>
                                        )}
                                    </td>
                                     <td>
                                        {withdrawal.status === 'U' && (
                                            <button
                                                onClick={() =>
                                                    openModal(
                                                        withdrawal.id,
                                                        withdrawal.userEmail,
                                                        withdrawal.withdrawAmout
                                                    )
                                                }
                                                className="editbutton"
                                                style={{ backgroundColor: 'orangered', border: 'none', color: 'white', borderRadius: '4px' }}
                                            >
                                                Add Amount
                                            </button>
                                        )}

                                        {withdrawal.status === 'A' && (
                                            <button
                                                style={{ backgroundColor: '#3CB371', border: 'none', color: 'white', borderRadius: '4px' }}
                                            >
                                                Approved
                                            </button>
                                        )}
                                    </td> 
                                    {/* <td>edit</td> */}
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
                <button onClick={approvedWithdrwalReqAmt}>Approved</button>
            </Modal>
        </div>
    )
}