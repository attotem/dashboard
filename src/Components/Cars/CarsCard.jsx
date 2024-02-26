import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cars.css";
import { useNavigate } from 'react-router-dom';

const CarsCard = ({
    brandLogo,
    brand,
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
    park_id,
    id
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const navigate = useNavigate();

    function EditCar() {
        navigate(`/edit_car/${id}`)
    }
    return (
        <div className="col">
            <div className="card" onClick={handleShow}>
                <div className="card-body text-center">
                    <img src={brandLogo} alt={brand} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{brand}</h5>
                    <p className="card-text">{kms} km</p>
                    <div className={`car_status ${statusColor}`}></div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header >
                    <Modal.Title>{brand} {model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex">
                                <div className="nameInfoCar">Model:</div>
                                <div className="infoCar">{model}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Year:</div>
                                <div className="infoCar">{year}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">VIN Number:</div>
                                <div className="infoCar">{VIN_number}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">KMs:</div>
                                <div className="infoCar">{kms}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Engine:</div>
                                <div className="infoCar">{engine}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Transmission:</div>
                                <div className="infoCar">{transmission}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Fuel Type:</div>
                                <div className="infoCar">{fuel_type}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">TI Expiration:</div>
                                <div className="infoCar">{ti_expiration}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Insurance Info:</div>
                                <div className="infoCar">{insurance_info}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Tire Size:</div>
                                <div className="infoCar">{tire_size}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Color:</div>
                                <div className="infoCar">{color}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">KMs per Day:</div>
                                <div className="infoCar">{kms_per_day}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Tire Type:</div>
                                <div className="infoCar">{tire_type}</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex">
                                <div className="nameInfoCar">Oil Change:</div>
                                <div className="infoCar">{oil_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Air Filter Change:</div>
                                <div className="infoCar">{air_filter_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Cabin Filter Change:</div>
                                <div className="infoCar">{cabin_filter_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Fuel Filter Change:</div>
                                <div className="infoCar">{fuel_filter_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Brake Pads Change:</div>
                                <div className="infoCar">{brake_pads_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Brake Disks Change:</div>
                                <div className="infoCar">{brake_disks_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Valvetrain Change:</div>
                                <div className="infoCar">{valvetrain_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Spark Plugs Change:</div>
                                <div className="infoCar">{spark_plugs_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Pendant Change:</div>
                                <div className="infoCar">{pendant_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Tire Change:</div>
                                <div className="infoCar">{tire_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Brake Fluid Change:</div>
                                <div className="infoCar">{brake_fluid_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Antifreeze Change:</div>
                                <div className="infoCar">{antifreeze_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Tire Type Change:</div>
                                <div className="infoCar">{tire_type_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Air Conditioning Change:</div>
                                <div className="infoCar">{air_conditioning_change}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Service Interval ID:</div>
                                <div className="infoCar">{service_interval_id}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">Park ID:</div>
                                <div className="infoCar">{park_id}</div>
                            </div>
                            <div className="d-flex">
                                <div className="nameInfoCar">ID:</div>
                                <div className="infoCar">{id}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-between'>
                    <button className="cancel_modal" onClick={handleClose}>Close</button>
                    <button className='edit_modal' onClick={EditCar}>Edit car</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CarsCard;
