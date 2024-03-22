import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import translations from "../translations.json"

function AddDriver() {
    // Consolidate all states into a single state object
    const [driverData, setDriverData] = useState({
        firstName: '',
        lastName: '',
        post: '',
        salary: 0,
        experience: 0,
        categories: '',
        phoneNumber: '',
        whatsapp: '',
        parkId: '',
        image: null, // Include image in the state object
    });
    const [parks, setParks] = useState([]);
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/parks/getAll", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setParks(data);
            })
            .catch(error => {
                console.error("Error fetching parks:", error);
            });
    }, []);

    function translate(key) {
        return translations[key] || key;
    }

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setDriverData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setDriverData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            first_name: driverData.firstName,
            last_name: driverData.lastName,
            post: driverData.post,
            salary: driverData.salary,
            experience: driverData.experience,
            categories: driverData.categories,
            phone_number: driverData.phoneNumber,
            whatsapp: driverData.whatsapp,
            park_id: driverData.parkId,
            photo: null
        }));

        if (driverData.image) {
            formData.append('image', driverData.image, `${driverData.firstName}_${driverData.lastName}.jpg`);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
            if (value instanceof File) {
                console.log(`${key} filename: ${value.name}`);
            }
        }

        fetch("https://ttestt.shop/cars/api/drivers/add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Driver successfully added!');
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                alert('Error: Could not add driver.');
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
                    {/* First Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("First Name")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder={translate("Enter First Name")}
                            value={driverData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Last Name")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder={translate("Enter Last Name")}
                            value={driverData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Post */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Post")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="post"
                            placeholder={translate("Enter Post")}
                            value={driverData.post}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Salary */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Salary")}</Form.Label>
                        <Form.Control
                            type="number"
                            name="salary"
                            placeholder={translate("Enter Salary")}
                            value={driverData.salary}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Experience */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Experience")}</Form.Label>
                        <Form.Control
                            type="number"
                            name="experience"
                            placeholder={translate("Enter Experience")}
                            value={driverData.experience}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Categories */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Categories")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="categories"
                            placeholder={translate("Enter Categories")}
                            value={driverData.categories}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Phone Number */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Phone Number")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder={translate("Enter Phone Number")}
                            value={driverData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Telegram */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Telegram")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="whatsapp"
                            placeholder={translate("Enter Telegram ID")}
                            value={driverData.whatsapp}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Image")}</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" onClick={handleCancel}>
                            {translate("Cancel")}
                        </Button>
                        <Button style={{ background: "rgb(182, 51, 46)", border: "none" }} type="submit">
                            {translate("Submit")}
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );


}

export default AddDriver;