import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import translations from "../translations.json"

function AddPark() {
    const [parkData, setParkData] = useState({
        name: "",
        password: "",
        image: null
    });
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];
   

    function translate(key) {
        return translations[key] || key;
    }

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setParkData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setParkData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const hashedPassword = bcrypt.hashSync(parkData.password, 10);

        const formData = new FormData();
        formData.append('data', JSON.stringify(
            {
                name: parkData.name,
                hashed_password: hashedPassword,
            }));
        if (parkData.image) {
            formData.append('image', parkData.image, `${parkData.name}.jpg`);
        }

        fetch("https://ttestt.shop/cars/api/parks/add", {
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
                alert('Park successfully added!');
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                alert('Error: Could not add park.');
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
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Name")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder={translate("Enter Park Name")}
                            value={parkData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Password")}</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder={translate("Enter Password")}
                            value={parkData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{translate("Image")}</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" onClick={handleCancel} className='cancel_create'>
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

export default AddPark;
