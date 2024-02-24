import React, { useState, useEffect } from 'react';
import { Container, Form, Button, FormGroup, FormCheck } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditUser() {
    let { userId } = useParams();

    const [userData, setUserData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        is_superuser: false,
    });
    const [changedData, setChangedData] = useState({});

    const cookie = document.cookie;
    const sessionId = cookie.split("=")[1];
    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_users", {
            method: "GET",
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }

        })
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == userId) {
                        setUserData({
                            email: data[i].email,
                            first_name: data[i].first_name,
                            last_name: data[i].last_name,
                            is_superuser: data[i].is_superuser,

                        });
                    }
                }

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

    }, [userId]);


    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setUserData(prev => ({
            ...prev,
            [name]: updatedValue
        }));

        setChangedData(prev => ({
            ...prev,
            [name]: updatedValue
        }));
    };

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUserData = {
            id: userId,
            fields: changedData,
        };

        console.log(updatedUserData)
        fetch("https://ttestt.shop/cars/api/update_user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`,
            },
            body: JSON.stringify(updatedUserData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('User data updated successfully');
                navigate(-1);
            })
            .catch(error => {
                console.error("Error updating user:", error);
                alert('Error: Could not update user data.');
            });
    };

    return (
        <>
            <Header />
            <Container>
                <h2>Edit User</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormCheck
                            type="checkbox"
                            label="Is Superuser"
                            name="is_superuser"
                            checked={userData.is_superuser}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default EditUser;
