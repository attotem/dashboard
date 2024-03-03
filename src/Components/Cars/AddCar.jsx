import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import ImageDropComponent from '../../ImageDropComponent';
import { useNavigate } from 'react-router-dom';
function AddCar() {
    const [driversData, setDriversData] = useState([]);
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        year: 0,
        VIN_number: "",
        kms: 0,
        engine: "",
        transmission: "",
        fuel_type: "",
        ti_expiration: "",
        insurance_info: "",
        tire_size: "",
        color: "",
        kms_per_day: 0,
        driver_id: null,
        tire_type: 0,
        oil_change: 0,
        air_filter_change: 0,
        cabin_filter_change: 0,
        fuel_filter_change: 0,
        brake_pads_change: 0,
        brake_disks_change: 0,
        valvetrain_change: 0,
        spark_plugs_change: 0,
        pendant_change: 0,
        tire_change: 0,
        brake_fluid_change: 0,
        antifreeze_change: 0,
        tire_type_change: "",
        air_conditioning_change: "",
    });

    const [serviceInterval, setServiceInterval] = useState({
        oil_change: 0,
        air_filter_change: 0,
        cabin_filter_change: 0,
        fuel_filter_change: 0,
        brake_pads_change: 0,
        brake_disks_change: 0,
        valvetrain_change: 0,
        spark_plugs_change: 0,
        pendant_change: 0,
        tire_change: 0,
        brake_fluid_change: 0,
        antifreeze_change: 0,
        tire_type_change_0: "",
        tire_type_change_1: "",
        air_conditioning_change: ""
    });

    const handleServiceIntervalChange = (event) => {
        const { name, value } = event.target;
        setServiceInterval(prevInterval => ({
            ...prevInterval,
            [name]: value
        }));
    };
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];
    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/getAll_drivers`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setDriversData(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [])
    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === "driver_id" && value === "" ? null : value;
        const finalValue = name === "tire_type" ? Number(value) : updatedValue;
        setCarData(prevData => ({
            ...prevData,
            [name]: finalValue
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const combinedData = {
            car: { ...carData },
            serviceInterval: { ...serviceInterval }
        };

        console.log(combinedData)

        fetch("https://ttestt.shop/cars/api/add_car", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionId}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(combinedData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Car with service interval successfully added!');
            })
            .catch(error => {
                console.error("Error while submitting the form:", error);
                alert('Error: Could not add car with service interval.');
            });
    };
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };
    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    {Object.keys(carData).map(key => {
                        if (key === "tire_type") {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>Tire Type</Form.Label>
                                    <Form.Select
                                        name={key}
                                        value={carData[key]}
                                        onChange={handleChange}
                                    >
                                        <option value="0">Winter</option>
                                        <option value="1">Summer</option>
                                    </Form.Select>
                                </Form.Group>
                            );
                        } else if (key === "driver_id") {
                            return ( // Додайте return тут
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>Driver</Form.Label>
                                    <Form.Select
                                        name={key}
                                        value={carData[key]}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a driver</option>
                                        {driversData.map((driver) => (
                                            <option key={driver.id} value={driver.id}>
                                                {driver.first_name} {driver.last_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            );
                        } else {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={key}
                                        placeholder={`Enter ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
                                        value={carData[key]}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            );
                        }
                    })}

                    <h3>Service Interval</h3>
                    {Object.keys(serviceInterval).map(key => (
                        <Form.Group className="mb-3" key={key}>
                            <Form.Label>{key.split('_').join(' ').replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
                            <Form.Control
                                type={typeof serviceInterval[key] === "number" ? "number" : "text"}
                                name={key}
                                value={serviceInterval[key]}
                                onChange={handleServiceIntervalChange}
                            />
                        </Form.Group>
                    ))}



                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" onClick={handleCancel} className='cancel_create'>
                            Cancel
                        </Button>
                        <Button style={{ background: "rgb(182, 51, 46)", border: "none" }} type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default AddCar;
