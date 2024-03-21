import React, { useState, useEffect } from 'react';
import { Card, Form, Modal, Button } from 'react-bootstrap';
import "./Payments.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import translations from "../translations.json"

const Payment = ({ id, issued_on, total_amount, note, number, client_name, status }) => {
    const [invoiceData, setInvoiceData] = useState({
        client_name: "",
        issued_on: "",
        total_amount: 0,
        note: "",
        number: "",
        status: "",
    });

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const updateStatus = (newStatus) => {
        fetch(`https://ttestt.shop/cars/api/invoices/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            },
            body: JSON.stringify({
                id: id,
                fields: {
                    status: newStatus
                }
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Status updated:", data);
                setInvoiceData(prevData => ({ ...prevData, status: newStatus }));
            })
            .catch(error => console.error("Error updating payment status:", error));
    };

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/invoices/get?id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setInvoiceData(data);
            })
            .catch(error => console.error("Error fetching invoice details:", error));
    }, [id]);

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        updateStatus(newStatus);
    };

   

    function translate(key) {
        return translations[key] || key;
    }

    return (
        <div className="payment-card my-3 card_calendar">
            <div className='d-flex justify-content-between align-items-center'>
                <Card.Title>{number}</Card.Title>
                <Card.Header>
                    <Form.Select
                        value={status}
                        onChange={handleStatusChange}
                        style={{
                            color: status === "paid" ? 'green' : 'rgb(182, 51, 46)',
                            fontWeight: 600
                        }}
                    >
                        <option style={{ color: 'green', fontWeight: 600 }} value="paid">{translate("Paid")}</option>
                        <option style={{ color: 'rgb(182, 51, 46)', fontWeight: 600 }} value="unpaid">{translate("Unpaid")}</option>
                    </Form.Select>
                </Card.Header>
            </div>

            <hr className='hr_info'></hr>

            <div className='d-flex justify-content-between'>
                <div className='d-flex flex-column'>
                    <div className='info_card_label'>{translate("Client")}</div>
                    <div className='info_card_info'>{client_name}</div>
                    <div className='info_card_label'>{translate("Issued on")}</div>
                    <div className='info_card_info'>{issued_on}</div>
                </div>
                <div className='d-flex flex-column'>
                    <div className='info_card_label'>{translate("Note")}</div>
                    <div className='info_card_info'>{note}</div>
                    <div className='info_card_label'>{translate("Total amount")}</div>
                    <div className='info_card_info'>{total_amount}</div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Client Name: {invoiceData.client_name}</p>
                    <p>Issued On: {invoiceData.issued_on}</p>
                    <p>Note: {invoiceData.note}</p>
                    <p>Total Amount: {invoiceData.total_amount}</p>
                    <p>Status: {invoiceData.status}</p>
                </Modal.Body>

            </Modal>


            <div className='button_upcoming' onClick={handleShowModal}>
                {translate("Details")}
            </div>
        </div>
    );


};

export default Payment;
