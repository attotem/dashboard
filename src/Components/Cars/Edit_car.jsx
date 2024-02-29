import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
    let { carId } = useParams();
    const navigate = useNavigate();

    // Состояния для данных автомобиля и сервисного интервала
    const [carData, setCarData] = useState(null);
    const [serviceIntervalData, setServiceIntervalData] = useState(null);

    // Для отслеживания изменений
    const [changedCarData, setChangedCarData] = useState({});
    const [changedServiceIntervalData, setChangedServiceIntervalData] = useState({});

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/get_car?id=${carId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCarData(data.car);
                setServiceIntervalData(data.serviceInterval);
            })
            .catch(error => console.error("Error fetching car data:", error));
    }, [carId]);

    const handleChangeCarData = (event) => {
        const { name, value } = event.target;
        setCarData(prev => ({ ...prev, [name]: value }));
        setChangedCarData(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeServiceIntervalData = (event) => {
        const { name, value } = event.target;
        setServiceIntervalData(prev => ({ ...prev, [name]: value }));
        setChangedServiceIntervalData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            id: carId,
            fields: changedCarData,
        };

        fetch(`https://ttestt.shop/cars/api/update_car`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                alert('Car successfully updated!');
                navigate(-1);
            })
            .catch(error => {
                console.error("Error updating car:", error);
                alert('Error: Could not update car.');
            });
    };

    if (!carData || !serviceIntervalData) return <div>Loading...</div>;

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    <h3>Car Information</h3>
                    {Object.keys(carData).map(key => (
                        <Form.Group className="mb-3" key={key}>
                            <Form.Label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
                            <Form.Control
                                type="text"
                                name={key}
                                value={carData[key]}
                                onChange={handleChangeCarData}
                            />
                        </Form.Group>
                    ))}

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default EditCar;
