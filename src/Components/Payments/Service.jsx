import React from 'react';
import { Card } from 'react-bootstrap';
import "./Payments.css"; // Make sure to create a Payment.css file for custom styles

const Service = ({ id, deadline, car_brand, car_model, name, quantity, status }) => {
    return (
        <div className="payment-card my-3 card_calendar">
            <Card.Title className=''>Service №{id}</Card.Title>
            <hr className='hr_info'></hr>

            <div className='d-flex justify-content-between'>

                <div className='d-flex flex-column'>
                    <div className='d-flex flex-column'>
                        <div className='info_card_label' >Note</div>
                        <div className='info_card_info'>{name}</div>
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='info_card_label'>Deadline</div>
                        <div className='info_card_info'>{deadline}</div>
                    </div>
                </div>
                <div className='d-flex flex-column'>

                    <div className='d-flex flex-column'>
                        <div className='info_card_label'>Car</div>
                        <div className='info_card_info'>{car_brand} {car_model}</div>
                    </div>
                    {/* <div className='d-flex flex-column'>
                        <div className='info_card_label'>Quantity</div>
                        <div className='info_card_info'>{quantity}</div>
                    </div> */}
                </div>
            </div>
            {status == "upcoming" ?
                <div className='button_upcoming'>
                    Details
                </div>
                :
                null}

            {status == "enroll" ?
                <div className='button_enroll'>
                    Enroll
                </div>
                :
                null}

            {status == "urgently" ?
                <div className='button_urgently'>
                    Urgently
                </div>
                :
                null}

        </div >
    );
};

export default Service;
