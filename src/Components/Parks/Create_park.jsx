import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

function AddPark() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [parkData, setParkData] = useState({
        name: "",
        password: ""
    });
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParkData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleServiceIntervalChange = (event) => {
        const { name, value } = event.target;
        setServiceInterval(prevInterval => ({
            ...prevInterval,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const hashedPassword = bcrypt.hashSync(parkData.password, 10);
        const submissionData = {
            name: parkData.name,
            hashed_password: hashedPassword
        };

        fetch("https://ttestt.shop/cars/api/add_park", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`

            },
            body: JSON.stringify(submissionData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Park successfully added!');
            })
            .catch(error => {
                console.error("Ошибка при отправке формы:", error);
                alert('Error: Could not add park.');
            });
    };
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };

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

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Park Name"
                            value={parkData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={parkData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

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

export default AddPark;
