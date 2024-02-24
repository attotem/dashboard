import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function EditPark({ parkId, onSave, show, onHide }) {
    const sessionId = document.cookie.split("=")[1];

    const [parkData, setParkData] = useState({ name: "", owner: "" });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (show) {
            fetchUsers();
            fetchParkData();
        }
    }, [parkId, show]);

    const fetchUsers = () => {
        fetch("https://ttestt.shop/cars/api/getAll_users", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    const fetchParkData = () => {
        fetch(`https://ttestt.shop/cars/api/getAll_parks?user_id=3`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const park = data.find(p => p.id === parkId);
                if (park) {
                    setParkData(park);
                }
            })
            .catch(error => {
                console.error("Error fetching park data:", error);
            });
    };

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParkData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://ttestt.shop/cars/api/update_park/${parkId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionId}`
            },
            body: JSON.stringify(parkData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                onSave();
                // handleClose();
            })
            .catch(error => {
                console.error("Error updating park:", error);
            });
    };

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Park</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Park Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter park name"
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
                                <option value="">Select Owner</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditPark;
