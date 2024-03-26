import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import { useNavigate } from 'react-router-dom';
// import translations from '../../translations.json';
import translations from "../translations.json"


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
        kms_per_month: 0,
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
        image: null
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


    function translate(key) {
        return translations[key] || key;
    }
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
        fetch(`https://ttestt.shop/cars/api/drivers/getAll`, {
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
        const { name, value, files } = event.target;
        const updatedValue = name === "driver_id" && value === "" ? null : value;
        const finalValue = name === "tire_type" ? Number(value) : updatedValue;
        if (files) {
            setCarData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setCarData(prevData => ({
                ...prevData,
                [name]: finalValue
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('data', JSON.stringify({
            car: { ...carData },
            serviceInterval: { ...serviceInterval },
        }));

        if (carData.image) {
            formData.append('image', carData.image, carData.image.name);
        }

        for (let [key, value] of formData.entries()) {

            console.log(`${key}: ${value}`);
        }

        fetch("https://ttestt.shop/cars/api/cars/add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionId}`,
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Auto successfully added with service interval!');
                navigate(-1);
            })
            .catch(error => {
                console.error("Error while submitting the form:", error);
                alert('Error: Could not add the car with service interval.');
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
                                    <Form.Label>{translate("tire_type")}</Form.Label>
                                    <Form.Select
                                        name={key}
                                        value={carData[key]}
                                        onChange={handleChange}
                                    >
                                        <option value="0">Zimní</option>
                                        <option value="1">Letní</option>
                                        <option value="-1">Všechna roční období</option>
                                    </Form.Select>
                                </Form.Group>
                            );
                        } else if (key === "driver_id") {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>Řidič</Form.Label>
                                    <Form.Select
                                        name={key}
                                        value={carData[key]}
                                        onChange={handleChange}
                                    >
                                        <option value="">Výběr ovladače</option>
                                        {driversData.map((driver) => (
                                            <option key={driver.id} value={driver.id}>
                                                {driver.first_name} {driver.last_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            );
                        } else if (key === "image") {
                            return (
                                <Form.Group className="mb-3">
                                    <Form.Label>{translate("Image")}</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            );
                        } else {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>{translate(key)}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={key}
                                        placeholder={`Vstupte na ${translate(key)}`}
                                        value={carData[key]}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            );
                        }
                    })}

                    <h3>Servisní interval</h3>
                    {Object.keys(serviceInterval).map(key => {
                        if ((key == "tire_type_change_0")) {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>{"Změna typu zimních pneumatik"}</Form.Label>
                                    <Form.Control
                                        type={typeof serviceInterval[key] === "number" ? "number" : "text"}
                                        name={key}
                                        value={serviceInterval[key]}
                                        onChange={handleServiceIntervalChange}
                                    />
                                </Form.Group>
                            )

                        } else if (key == "tire_type_change_1") {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>{"Změna typu letních pneumatik"}</Form.Label>
                                    <Form.Control
                                        type={typeof serviceInterval[key] === "number" ? "number" : "text"}
                                        name={key}
                                        value={serviceInterval[key]}
                                        onChange={handleServiceIntervalChange}
                                    />
                                </Form.Group>
                            );
                        }
                        else {
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>{translate(key)}</Form.Label>
                                    <Form.Control
                                        type={typeof serviceInterval[key] === "number" ? "number" : "text"}
                                        name={key}
                                        value={serviceInterval[key]}
                                        onChange={handleServiceIntervalChange}
                                    />
                                </Form.Group>
                            )
                        }
                    })
                    }


                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" onClick={() => navigate(-1)} className='cancel_create'>
                            Zrušit
                        </Button>
                        <Button style={{ background: "rgb(182, 51, 46)", border: "none" }} type="submit">
                            Odeslat
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default AddCar;
