import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cars.css";
import { useNavigate } from 'react-router-dom';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
const CarsCard = ({
    brand,
    id,
    image,
    kms,
    model,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [carInfo, setCarInfo] = useState(null);
    const [Info, setInfo] = useState(false);

    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();

    function EditCar() {
        navigate(`/edit_car/${id}`)
    }

    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];

    function ShowInfo() {
        setShowModal(true);
        fetch(`https://ttestt.shop/cars/api/get_car?id=${id}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCarInfo(data);

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    const renderCarInfo = (car) => {
        return Object.entries(car).map(([key, value], index) => (
            <div className="d-flex" key={index}>
                <div className="nameInfoCar">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</div>
                <div className="infoCar">{value}</div>
            </div>
        ));
    };
    function swap() {
        setInfo(!Info)
    }
    function EditInfo(id) {
        navigate(`/edit_info/${id}`)
    }
    return (
        <div className="col">
            <div className="card" onClick={ShowInfo} >
                <div className="card-body text-center">
                    <img src={image} alt={brand} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{brand}</h5>
                    <p className="card-text">{kms} km</p>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg">
                {carInfo && (
                    <>
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>{carInfo.car.brand} {carInfo.car.model}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div onClick={swap} className='Switch_container'><SwapHorizIcon /></div>
                                <div className="row">
                                    {Info ?
                                        <>
                                            <h3>Car Info</h3>
                                            <div className="col-md-6">
                                                {renderCarInfo(carInfo.car)}
                                            </div>
                                        </> : <>
                                            <h3>Service interval</h3>
                                            <div className="col-md-6">
                                                {renderCarInfo(carInfo.serviceInterval)}
                                            </div>
                                        </>}

                                </div>
                            </Modal.Body>
                        </>
                        <Modal.Footer className='d-flex justify-content-between'>
                            <button className="cancel_modal" onClick={handleClose}>Close</button>

                            {Info ?
                                <>
                                    <button className='edit_modal' onClick={EditCar}>Edit car</button>

                                </> : <>
                                    {/* <button className='edit_modal' onClick={() => EditInfo(carInfo.serviceInterval.id)}>Edit info</button> */}

                                </>}
                        </Modal.Footer>

                    </>
                )}

            </Modal>
        </div >
    );
};

export default CarsCard;
