import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';

function AddCar() {
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
        // not required
        tire_type: 0,
        // 1 or 0 
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === "driver_id" && value === "" ? null : value;
        setCarData(prevData => ({
            ...prevData,
            [name]: updatedValue
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(JSON.stringify(carData))


        fetch("https://ttestt.shop/cars/api/add_car", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Car successfully added!');
            })
            .catch(error => {
                console.error("Ошибка при отправке формы:", error);
                alert('Error: Could not add car.');
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

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        </>
    );
}

export default AddCar;
