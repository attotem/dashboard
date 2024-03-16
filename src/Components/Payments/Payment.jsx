import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import "./Payments.css";

const Payment = ({ id, issued_on, total_amount, note, number, client_name, status }) => {
    const [currentStatus, setCurrentStatus] = useState(status);

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
            })
            .catch(error => console.error("Error updating payment status:", error));
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setCurrentStatus(newStatus);
        updateStatus(newStatus);
    };

    const translations = {
        "Client": "Klient",
        "Issued on": "Vystaveno",
        "Note": "Poznámka",
        "Total amount": "Celková částka",
        "Details": "Detaily",
        "Paid": "Zaplaceno",
        "Unpaid": "Nezaplaceno",
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
                        value={currentStatus}
                        onChange={handleStatusChange}
                        style={{
                            color: currentStatus === "paid" ? 'green' : 'rgb(182, 51, 46)',
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
            <div className='button_upcoming'>
                {translate("Details")}
            </div>
        </div>
    );

};

export default Payment;
