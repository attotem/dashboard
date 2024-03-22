import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditDriver() {
    const navigate = useNavigate();
    const { driverId } = useParams();
    const [driverData, setDriverData] = useState({
        first_name: '',
        last_name: '',
        post: '',
        salary: 0,
        experience: 0,
        categories: '',
        phone_number: '',
        tg: '',
        parkId: '',
        image: null,
    });
    const [changedData, setChangedData] = useState({});
    const cookie = document.cookie;
    const sessionId = cookie.split("=")[1];

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/drivers/get?id=${driverId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionId}`,
            },
        })
            .then(response => response.json())
            .then(data => setDriverData(data))
            .catch(error => console.error("Error fetching driver data:", error));
    }, [driverId, sessionId]);

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (name === 'image') {
            setDriverData(prevData => ({
                ...prevData,
                image: files[0]
            }));
        } else {
            const updatedValue = type === 'checkbox' ? checked : value;
            setDriverData(prevData => ({
                ...prevData,
                [name]: updatedValue
            }));
            setChangedData(prevData => ({
                ...prevData,
                [name]: updatedValue
            }));
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        const dataObject = {
            id: driverId,
            fields: changedData,
        };

        formData.append('data', JSON.stringify(dataObject));

        if (driverData.image && driverData.image instanceof File) {
            formData.append('image', driverData.image, driverData.image.name);
        }

        fetch(`https://ttestt.shop/cars/api/drivers/update`, {
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
            .then(() => {
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
                        <Form.Label>WhatsApp</Form.Label>
                        <Form.Control type="text" placeholder="Enter WhatsApp " name="tg" value={driverData.tg} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </Form.Group>



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

export default EditDriver;
