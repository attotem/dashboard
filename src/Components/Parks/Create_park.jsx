import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';

function AddPark() {
    const [parkData, setParkData] = useState({
        name: "",
        owner: ""
    });
    const [users, setUsers] = useState([]); // Состояние для хранения списка пользователей
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_users", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data); // Сохраняем список пользователей в состояние
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParkData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://ttestt.shop/cars/api/add_park", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parkData)
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
                        <Form.Label>Owner</Form.Label>
                        <Form.Control
                            as="select"
                            name="owner"
                            value={parkData.owner}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Owner</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>


                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        </>
    );
}

export default AddPark;
