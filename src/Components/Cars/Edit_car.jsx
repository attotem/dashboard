import React, { useState, useEffect } from 'react';
import { Container, Form, Button, FormGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
    let { carId } = useParams();
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        year: "",
        VIN_number: "",
        kms: "",
        engine: "",
        transmission: "",
        fuel_type: "",
        ti_expiration: "",
        insurance_info: "",
        tire_size: "",
        color: "",
        kms_per_day: "",
        driver_id: null,
        tire_type: "",
        oil_change: "",
        air_filter_change: "",
        cabin_filter_change: "",
        fuel_filter_change: "",
        brake_pads_change: "",
        brake_disks_change: "",
        valvetrain_change: "",
        spark_plugs_change: "",
        pendant_change: "",
        tire_change: "",
        brake_fluid_change: "",
        antifreeze_change: "",
        tire_type_change: "",
        air_conditioning_change: "",
        service_interval_id: "",
        park_id: "",
    });
    const [changedData, setChangedData] = useState({});
    const sessionId = document.cookie.split("=")[1];

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
                        setCarData(data[i]);
                    }
                }

            })
            .catch(error => {
                console.error("Error fetching car data:", error);
            });
    }, [carId, sessionId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCarData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setChangedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log({ id: carId, fields: changedData })

        fetch(`https://ttestt.shop/cars/api/update_car`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`
            },
            body: JSON.stringify({ id: carId, fields: changedData }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                alert('Car successfully updated!');
                navigate(-1);
            })
            .catch(error => {
                console.error("Error updating car:", error);
                alert('Error: Could not update car.');
            });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
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
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button variant="primary" style={{ background: "rgb(182, 51, 46)", border: "none" }} type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default EditCar;
