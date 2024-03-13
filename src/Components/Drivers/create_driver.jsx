import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AddDriver() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [post, setPost] = useState('');
    const [salary, setSalary] = useState(0);
    const [experience, setExperience] = useState(0);
    const [categories, setCategories] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [parkId, setParkId] = useState('');
    const [parks, setParks] = useState([]);
    const cookie = document.cookie
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const driverData = {
            first_name: firstName,
            last_name: lastName,
            post: post,
            salary: Number(salary),
            experience: Number(experience),
            categories: categories,
            phone_number: phoneNumber,
            whatsapp: whatsapp,
            park_id: Number(parkId),
        };

        fetch("https://ttestt.shop/cars/api/drivers/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`

            },
            body: JSON.stringify(driverData)
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
                console.error("Ошибка при отправке формы:", error);
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
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Post</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Post"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </Form.Group>

                    {/* Категории */}
                    <Form.Group className="mb-3">
                        <Form.Label>Categories</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Categories"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                        />
                    </Form.Group>

                    {/* Номер телефона */}
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    {/* Telegram */}
                    <Form.Group className="mb-3">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Telegram ID"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                    </Form.Group>

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

export default AddDriver;