import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import translations from "../translations.json"

function EditPark({ parkId, onSave, show, onHide }) {
    const navigate = useNavigate();
    const [parkData, setParkData] = useState({ name: "", owner: "" });
    const [changedData, setChangedData] = useState({});
    const [trigger, setTrigger] = useState(true);
    const sessionId = document.cookie.split("=")[1];

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
   
    function translate(text) {
        return translations[text] || text;
    }

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (name === 'image') {
            setParkData(prevData => ({
                ...prevData,
                image: files[0]
            }));
        } else {
            const updatedValue = type === 'checkbox' ? checked : value;
            setParkData(prevData => ({
                ...prevData,
                [name]: updatedValue
            }));
            setChangedData(prevData => ({
                ...prevData,
                [name]: updatedValue
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const dataObject = {
            id: parkId,
            fields: changedData,
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(dataObject));

        if (parkData.image && parkData.image instanceof File) {
            formData.append('image', parkData.image, `${parkData.name}.jpg`);
        } else {
            console.log("No image or invalid image file");
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value instanceof Blob ? `File: ${value.name}, size: ${value.size}` : value);
        }

        fetch(`https://ttestt.shop/cars/api/parks/update`, {
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
        setTrigger(false)
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
                    <Modal.Title>{translate("Edit Park")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>{translate("Park Name")}</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder={translate("Enter park name")}
                                value={parkData.name}
                                onChange={handleChange}
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
                            <Button variant="outline-secondary" type="button" onClick={DeletePark}>
                                <DeleteForeverIcon /> {translate("Delete")}
                            </Button>
                            <Button style={{ background: "rgb(182, 51, 46)", border: "none" }} type="submit">
                                {translate("Submit")}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default EditPark;
