import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function EditPark({ parkId, onSave, show, onHide }) {
    const navigate = useNavigate();
    const [parkData, setParkData] = useState({ name: "", owner: "" });
    const [changedData, setChangedData] = useState({});
    const [trigger, settrigger] = useState(true);
    const sessionId = document.cookie.split("=")[1];
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (show) {
            fetchParkData();
        }
    }, [parkId, show, trigger]);


    const fetchParkData = () => {
        fetch(`https://ttestt.shop/cars/api/parks/getAll`, {
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

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setParkData(prevData => ({
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

        const updatedParkData = {
            id: parkId,
            fields: changedData,
        };

        console.log(updatedParkData);
        fetch(`https://ttestt.shop/cars/api/parks/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`,
            },
            body: JSON.stringify(updatedParkData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Park data updated successfully');
            })
            .catch(error => {
                console.error("Error updating park:", error);
                alert('Error: Could not update park data.');
            });
    };

    function DeletePark() {
        settrigger(false)
        fetch(`https://ttestt.shop/cars/api/parks/remove`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`,
            },
            body: JSON.stringify({ id: parkId }),
        })
            .then(response => {

            })
            .then(data => {
            })
            .catch(error => {

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



                        <div className="d-flex justify-content-between">
                            <Button variant="outline-secondary" type="button" onClick={DeletePark} className='cancel_modal'>
                                <DeleteForeverIcon />
                            </Button>
                            <Button style={{ background: "rgb(182, 51, 46)", border: "none" }} onClick={handleSubmit} type="submit">
                                Submit
                            </Button>
                        </div>


                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditPark;
