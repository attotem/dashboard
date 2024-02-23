import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cars.css";

const CarsCard = ({
    brandLogo,
    brandName,
    distance,
    statusColor,
    model,
    year,
    VIN_number,
    kms,
    engine,
    transmission,
    fuel_type,
    ti_expiration,
    insurance_info,
    tire_size,
    color,
    kms_per_day,
    driver_id,
    tire_type,
    oil_change,
    air_filter_change,
    cabin_filter_change,
    fuel_filter_change,
    brake_pads_change,
    brake_disks_change,
    valvetrain_change,
    spark_plugs_change,
    pendant_change,
    tire_change,
    brake_fluid_change,
    antifreeze_change,
    tire_type_change,
    air_conditioning_change,
    service_interval_id,
    park_id
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="col">
            <div className="card" onClick={handleShow}>
                <div className="card-body text-center">
                    <img src={brandLogo} alt={brandName} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{brandName}</h5>
                    <p className="card-text">{distance} km</p>
                    <div className={`car_status ${statusColor}`}></div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{brandName} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Model: {model}</p>
                    <p>Year: {year}</p>
                    <p>VIN Number: {VIN_number}</p>
                    <p>KMs: {kms}</p>
                    <p>Engine: {engine}</p>
                    <p>Transmission: {transmission}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CarsCard;
