import React, { useState, useEffect } from 'react';
import { Container, Form, Button, FormGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditServiceInterval() {
    let { intervalId } = useParams(); // Получаем ID интервала из URL
    const navigate = useNavigate();
    const [serviceInterval, setServiceInterval] = useState({
        air_conditioning_change: "",
        air_filter_change: "",
        antifreeze_change: "",
        brake_disks_change: "",
        brake_fluid_change: "",
        brake_pads_change: "",
        cabin_filter_change: "",
        fuel_filter_change: "",
        oil_change: "",
        pendant_change: "",
        spark_plugs_change: "",
        tire_change: "",
        tire_type_change_0: "",
        tire_type_change_1: "",
        valvetrain_change: "",
    });
    const [changedFields, setChangedFields] = useState({});
    const sessionId = document.cookie.split("=")[1];

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/get_service_interval?id=${intervalId}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setServiceInterval(data.serviceInterval); // Установка начальных значений
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [intervalId, sessionId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setServiceInterval(prevData => ({
            ...prevData,
            [name]: value
        }));
        setChangedFields(prevFields => ({
            ...prevFields,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://ttestt.shop/cars/api/update_service_interval`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionId}`
            },
            body: JSON.stringify({ id: intervalId, fields: changedFields }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                alert('Service interval successfully updated!');
                navigate(-1); // Возвращаем пользователя назад после обновления
            })
            .catch(error => {
                console.error("Error updating service interval:", error);
                alert('Error: Could not update service interval.');
            });
    };

    const handleCancel = () => {
        navigate(-1); // Отмена и возврат назад
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} className='w-75'>
                {Object.keys(serviceInterval).map(key => (
                    <FormGroup className="mb-3" key={key}>
                        <Form.Label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
                        <Form.Control
                            type="text"
                            name={key}
                            placeholder={`Enter ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
                            value={serviceInterval[key]}
                            onChange={handleChange}
                        />
                    </FormGroup>
                ))}
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" style={{ background: "rgb(182, 51, 46)", border: "none" }} type="submit">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default EditServiceInterval;
