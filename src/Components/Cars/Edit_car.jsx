import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import { useParams } from 'react-router-dom';

function EditCar() {
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
        service_interval_id: 1,
        park_id: 0,
    });
    const [changedData, setChangedData] = useState({});
    let { carId } = useParams();
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_park_cars?park_id=1", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {

                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == carId) {
                        setCarData(data[i])
                        console.log(data[i])
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === "driver_id" && value === "" ? null : value;
        setCarData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setChangedData(prevData => ({
            ...prevData,
            [name]: updatedValue 
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://ttestt.shop/cars/api/update_car/${carId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`
            },
            body: JSON.stringify(changedData) 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Car successfully updated!');
            })
            .catch(error => {
                console.error("Error updating car:", error);
                alert('Error: Could not update car.');
            });
    };

    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    {Object.keys(carData).map(key => (
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
                    ))}
                    <Button variant="primary" type="submit">Update Car</Button>
                </Form>
            </Container>
        </>
    );
}

export default EditCar;
