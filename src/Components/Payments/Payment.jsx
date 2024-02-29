import React from 'react';
import { Card } from 'react-bootstrap';
import "./Payments.css"; // Make sure to create a Payment.css file for custom styles

const Payment = ({ id, issued_on, car_brand, car_model, note, total_amount }) => {
    return (
        <div className="payment-card my-3 card_calendar">
            <div className='padding'>
                <Card.Title>Invoice №{id}</Card.Title>



                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column'>
                        <div >Note</div>
                        <div>{note}</div>
                    </div>

                    <div className='d-flex flex-column'>
                        <div>Car</div>
                        <div>{car_brand} {car_model}</div>
                    </div>
                </div>

                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column'>
                        <div>Date</div>
                        <div>{issued_on}</div>
                    </div>
                    <div className='d-flex flex-column'>
                        <div>Total</div>
                        <div>{total_amount}</div>
                    </div>


                </div>

            </div>

            {/* <div className="d-flex justify-content-between align-items-center mt-2">
                <Card.Text>Модель: {model}</Card.Text>
                <Card.Text>Примечание: {note}</Card.Text>
            </div> */}


            {/* <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-success">Детали</button>
            </div> */}
        </div>
    );
};

export default Payment;
