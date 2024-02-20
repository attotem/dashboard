import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';

function AddDriver() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [post, setPost] = useState('');
    const [salary, setSalary] = useState(0);
    const [experience, setExperience] = useState(0);
    const [categories, setCategories] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tg, setTg] = useState('');
    const [parkId, setParkId] = useState('');
    const [parks, setParks] = useState([]);

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_parks?user_id=3", {
            method: "GET",
            cache: "no-cache"
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
            tg: tg,
            park_id: Number(parkId),
        };

        fetch("https://ttestt.shop/cars/api/add_driver", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
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

    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    {/* Имя */}
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    {/* Фамилия */}
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    {/* Должность */}
                    <Form.Group className="mb-3">
                        <Form.Label>Post</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Post"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                        />
                    </Form.Group>

                    {/* Зарплата */}
                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </Form.Group>

                    {/* Опыт */}
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
                            value={tg}
                            onChange={(e) => setTg(e.target.value)}
                        />
                    </Form.Group>

                    {/* ID парка */}
                    <Form.Group className="mb-3">
                        <Form.Label>Park</Form.Label>
                        <Form.Control
                            as="select"
                            value={parkId}
                            onChange={(e) => setParkId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Par</option>
                            {parks.map(park => (
                                <option key={park.id} value={park.id}>
                                    {park.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Кнопки */}
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" className='cancel_create'>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='submit_create'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default AddDriver;
