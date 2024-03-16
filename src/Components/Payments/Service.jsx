import React from 'react';
import { Card } from 'react-bootstrap';
import "./Payments.css";
const translations = {
    "Service №": "Servis č.",
    "Note": "Poznámka",
    "Deadline": "Termín",
    "Car": "Auto",
    "Details": "Detaily",
    "Enroll": "Zapsat",
    "Urgently": "Naléhavě",
};
function translate(key) {
    return translations[key] || key;
}


const Service = ({ id, deadline, car_brand, car_model, name, quantity, status }) => {
    return (
        <div className="payment-card my-3 card_calendar">
            <Card.Title className=''>{translate("Service №")}{id}</Card.Title>
            <hr className='hr_info'></hr>

            <div className='d-flex justify-content-between'>
                <div className='d-flex flex-column'>
                    <div className='info_card_label'>{translate("Note")}</div>
                    <div className='info_card_info'>{name}</div>
                    <div className='info_card_label'>{translate("Deadline")}</div>
                    <div className='info_card_info'>{deadline}</div>
                </div>
                <div className='d-flex flex-column'>
                    <div className='info_card_label'>{translate("Car")}</div>
                    <div className='info_card_info'>{car_brand} {car_model}</div>
                </div>
            </div>
            {status === "upcoming" ?
                <div className='button_upcoming'>
                    {translate("Details")}
                </div>
                : null}
            {status === "enroll" ?
                <div className='button_enroll'>
                    {translate("Enroll")}
                </div>
                : null}
            {status === "urgently" ?
                <div className='button_urgently'>
                    {translate("Urgently")}
                </div>
                : null}
        </div>
    );

};

export default Service;
