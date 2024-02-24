import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditDriver() {
    const navigate = useNavigate();

    let { driverId } = useParams();
    const [changedData, setChangedData] = useState({});

    const [driverData, setDriverData] = useState({
        first_name: '',
        last_name: '',
        lastName: '',
        post: '',
        salary: 0,
        experience: 0,
        categories: '',
        phone_number: '',
        tg: '',
        parkId: '',
    });
    const [parks, setParks] = useState([]);
    const cookie = document.cookie;
    const sessionId = cookie.split("=")[1];

    const handleCancel = () => {
        navigate(-1);
    };


    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_parks?user_id=3", {
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

        fetch("https://ttestt.shop/cars/api/getAll_drivers?park_id=1", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == driverId) {
                        setDriverData(data[i])
                    }
                }

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [driverId, sessionId]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setDriverData(prevData => ({
            ...prevData,
            [name]: updatedValue
        }));

        setChangedData(prevData => ({
            ...prevData,
            [name]: updatedValue
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedDriverData = {
            id: driverId,
            fields: changedData,
        };

        console.log(updatedDriverData);
        fetch("https://ttestt.shop/cars/api/update_driver", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`,
            },
            body: JSON.stringify(updatedDriverData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Driver data updated successfully');
                navigate(-1);
            })
            .catch(error => {
                console.error("Error updating driver:", error);
                alert('Error: Could not update driver data.');
            });
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" name="first_name" value={driverData.first_name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name="last_name" value={driverData.last_name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Post</Form.Label>
                        <Form.Control type="text" placeholder="Enter Post" name="post" value={driverData.post} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="number" placeholder="Enter Salary" name="salary" value={driverData.salary} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control type="number" placeholder="Enter Experience" name="experience" value={driverData.experience} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categories</Form.Label>
                        <Form.Control type="text" placeholder="Enter Categories" name="categories" value={driverData.categories} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Phone Number" name="phoneNumber" value={driverData.phone_number} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control type="text" placeholder="Enter Telegram ID" name="tg" value={driverData.tg} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Park</Form.Label>
                        <Form.Control as="select" name="parkId" value={driverData.parkId} onChange={handleChange} required>
                            <option value="">Select Park</option>
                            {parks.map(park => (
                                <option key={park.id} value={park.id}>{park.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default EditDriver;
