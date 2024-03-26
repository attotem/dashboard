import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cars.css";
import { useNavigate } from 'react-router-dom';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import translations from "../translations.json"

const CarsCard = ({
    brand,
    id,
    kms,
    model,
    status,
    image,
    fetchCars

}) => {
    const [showModal, setShowModal] = useState(false);
    const [carInfo, setCarInfo] = useState(null);
    const [Info, setInfo] = useState(true);
    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();

    function EditCar() {
        navigate(`/edit_car/${id}`)
    }

    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];



    function translate(key) {
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return translations[key] ? translations[key] : formattedKey;
    }



    function ShowInfo() {
        setShowModal(true);
        fetch(`https://ttestt.shop/cars/api/cars/get?id=${id}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const roundedCarData = roundNumericValues(data.car);
                const roundedServiceIntervalData = roundNumericValues(data.serviceInterval);

                setCarInfo({
                    ...data,
                    car: roundedCarData,
                    serviceInterval: roundedServiceIntervalData
                });
            })
            .catch(error => {
                console.error("Chyba při získávání dat:", error);
            });
    }

    function DeleteCar() {
        fetch(`https://ttestt.shop/cars/api/cars/remove`, {
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
                console.log(data);
                setShowModal(false);
                fetchCars()
            })
            .catch(error => {
                console.error("Ошибка при удалении машины:", error);
            });
    }


    const renderCarInfo = (car) => {
        const excludedFields = ['id', 'image', 'driver_id', 'photo'];
        const filteredEntries = Object.entries(car).filter(([key, _]) => !excludedFields.includes(key));
        const halfwayPoint = Math.ceil(filteredEntries.length / 2);

        const firstHalf = filteredEntries.slice(0, halfwayPoint).map(([key, value], index) => (
            <div className="d-flex" key={index}>
                <div className="nameInfoCar">{translate(key)}:</div>
                <div className="infoCar">{value}</div>
            </div>
        ));

        const secondHalf = filteredEntries.slice(halfwayPoint).map(([key, value], index) => (
            <div className="d-flex" key={index}>
                <div className="nameInfoCar">{translate(key)}:</div>
                <div className="infoCar">{value}</div>
            </div>
        ));

        return { firstHalf, secondHalf };
    };
    function roundNumericValues(obj) {
        const roundedObj = {};
        Object.entries(obj).forEach(([key, value]) => {
            roundedObj[key] = typeof value === 'number' ? Math.round(value) : value;
        });
        return roundedObj;
    }

    function swap() {
        setInfo(!Info)
    }
    function EditInfo(id) {
        navigate(`/edit_info/${id}`)
    }
    return (
        <div className="col">
            <div className="card" onClick={ShowInfo} >
                <div className='d-flex car_status justify-content-center'>

                    {status === "serviced" ?
                        <div className='green_blambda'>Proveden servis</div>
                        : null}
                    {status === "need service" ?
                        <div className='yellow_blambda'>Potřeba servisu</div>
                        : null}
                    {status === "urgenly service" ?
                        <div className='red_blambda'>Naléhavě potřeba servisu</div>
                        : null}
                </div>


                <div className="card-body text-center">
                    <div className='image_container'>
                        <img src={image} alt={brand} className="card-img-top" />
                    </div>
                    <h5 className="card-title">{brand} {model}</h5>
                    <p className="card-text" style={{ fontSize: "1rem" }}>{kms} km</p>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg">
                {carInfo && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{carInfo.car.brand} {carInfo.car.model}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='img_container'>
                                <img className='img_car' src={carInfo.car.photo}></img>

                            </div>

                            {Info ?
                                <div onClick={swap} className='Switch_container'>Přepnout na interval servisu <SwapHorizIcon /></div>
                                :
                                <div onClick={swap} className='Switch_container'>Přepnout na informace o autě <SwapHorizIcon /></div>
                            }

                            <div className="row">
                                {Info ?
                                    <>
                                        <h3>Informace o autě</h3>
                                        <div className="col-md-6">
                                            {renderCarInfo(carInfo.car).firstHalf}
                                        </div>
                                        <div className="col-md-6">
                                            {renderCarInfo(carInfo.car).secondHalf}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h3>Interval servisu</h3>

                                        <div className="col-md-6">
                                            {renderCarInfo(carInfo.serviceInterval).firstHalf}
                                        </div>
                                        <div className="col-md-6">
                                            {renderCarInfo(carInfo.serviceInterval).secondHalf}
                                        </div>

                                        {/* <div className="col-md-6">
                                            {renderCarInfo(carInfo.serviceInterval)}
                                        </div> */}
                                    </>
                                }
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='d-flex justify-content-between'>
                            <Button variant="outline-secondary" type="button" className='d-flex align-items-center' onClick={DeleteCar}>
                                <DeleteForeverIcon /> {translate("Delete")}
                            </Button>
                            {Info ?
                                <button className='edit_modal' onClick={EditCar}>Upravit auto</button>
                                :
                                <button className='edit_modal' onClick={() => EditInfo(carInfo.car.id)}>Upravit info</button>
                            }
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default CarsCard;
