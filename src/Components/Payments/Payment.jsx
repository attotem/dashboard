import React from 'react';
import { Card } from 'react-bootstrap';
import "./Payments.css"; // Make sure to create a Payment.css file for custom styles

const Payment = ({ id, issued_on, car_brand, car_model, name, quantity }) => {
    return (
        <div className="payment-card my-3 card_calendar">
            <Card.Title className='invoice'>Service №{id}</Card.Title>
            <hr className='hr_info'></hr>

            <div className='d-flex justify-content-between'>

                <div className='d-flex flex-column'>
                    <div className='d-flex flex-column'>
                        <div className='info_card_label' >Note</div>
                        <div className='info_card_info'>{name}</div>
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='info_card_label'>Date</div>
                        <div className='info_card_info'>{issued_on}</div>
                    </div>
                </div>
                <div className='d-flex flex-column'>

                    <div className='d-flex flex-column'>
                        <div className='info_card_label'>Car</div>
                        <div className='info_card_info'>{car_brand} {car_model}</div>
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='info_card_label'>Quantity</div>
                        <div className='info_card_info'>{quantity}</div>
                    </div>
                </div>
            </div>
            <div className='button_upcoming'>
                Details
            </div>
        </div >
    );
};

export default Payment;
