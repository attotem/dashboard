import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cars.css";
import { useNavigate } from 'react-router-dom';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CarsCard = ({
    brand,
    id,
    kms,
    model,
    status,
    image
}) => {
    const [showModal, setShowModal] = useState(false);
    const [carInfo, setCarInfo] = useState(null);
    const [Info, setInfo] = useState(true);
    // const image = "https://assets-global.website-files.com/5f79fedc952b4abde5bddcea/5f7ba1e83b1e8c197f4c658a_abarth-min.png"
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
    function DeleteCar() {
        setShowModal(false);
        fetch(`https://ttestt.shop/cars/api/remove_car`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    const renderCarInfo = (car) => {
        const filteredEntries = Object.entries(car).filter(([key, value]) => !['id', 'image', 'driver_id'].includes(key));

        return filteredEntries.map(([key, value], index) => (
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
                {status == "serviced" ? <div className='car_status car_yellow'>Serviced</div> : null}
                {status == "need service" ? <div className='car_status car_yellow'>Need service</div> : null}
                {status == "urgently service" ? <div className='car_status car_red '> Urgently service </div> : null}

                <div className="card-body text-center">
                    <div className='image_container'>
                        <img src={image} alt={brand} className="card-img-top" />

                    </div>
                    <h5 className="card-title">{brand} {model}</h5>
                    <h5 className="card-title"></h5>
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
                                {Info ?
                                    <>
                                        <div onClick={swap} className='Switch_container'>Switch to service interval <SwapHorizIcon /></div>

                                    </> : <>
                                        <div onClick={swap} className='Switch_container'>Switch to car information <SwapHorizIcon /></div>

                                    </>}


                                <div className="row">
                                    {Info ?
                                        <>
                                            <h3>Car Info</h3>
                                            <div className="col-md-6">
                                                {renderCarInfo(carInfo.car).slice(0, Math.ceil(Object.keys(carInfo.car).length / 2))}
                                            </div>
                                            <div className="col-md-6">
                                                {renderCarInfo(carInfo.car).slice(Math.ceil(Object.keys(carInfo.car).length / 2))}
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
                            <button className="cancel_modal" onClick={DeleteCar}><DeleteForeverIcon /></button>

                            {Info ?
                                <>
                                    <button className='edit_modal' onClick={EditCar}>Edit car</button>

                                </> : <>
                                    <button className='edit_modal' onClick={() => EditInfo(carInfo.car.id)}>Edit info</button>

                                </>}
                        </Modal.Footer>

                    </>
                )}

            </Modal>
        </div >
    );
};

export default CarsCard;
