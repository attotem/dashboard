import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import bcrypt from 'bcryptjs';

function AddPark() {
    const [parkData, setParkData] = useState({
        name: "",
        password: "" // Используйте 'password' для хранения ввода от пользователя
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

    return (
        <>
            <Header />
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

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        </>
    );
}

export default AddPark;
