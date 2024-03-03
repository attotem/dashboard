import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
    let { carId } = useParams();
    const navigate = useNavigate();

    const [carData, setCarData] = useState({});
    const [serviceIntervalData, setServiceIntervalData] = useState({});
    const [driversData, setDriversData] = useState([]);

    // Завантаження даних про автомобіль і водіїв
    useEffect(() => {
        // Завантаження даних про автомобіль
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

        // Завантаження даних про водіїв
        fetch(`https://ttestt.shop/cars/api/getAll_drivers`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            }
        })
            .then(response => response.json())
            .then(setDriversData)
            .catch(error => console.error("Error fetching drivers data:", error));
    }, [carId]);

    // Обробка змін у формі
    const handleChangeCarData = (event) => {
        const { name, value } = event.target;
        setCarData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Об'єднання даних автомобіля та сервісного інтервалу для відправки
        const updatedData = {
            car: { ...carData },
            serviceInterval: { ...serviceIntervalData }
        };

        fetch(`https://ttestt.shop/cars/api/update_car`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`,
                "Content-Type": "application/json"
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
                navigate(-1); // Повернення на попередню сторінку
            })
            .catch(error => {
                console.error("Error updating car:", error);
                alert('Error: Could not update car.');
            });
    };

    if (!carData || !serviceIntervalData) return <div>Loading...</div>;

    return (
        <Container>
            <Form onSubmit={handleSubmit} className='w-75'>
                {/* Динамічно генеровані поля для редагування даних автомобіля */}
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

                {/* Вибір водія */}
                <Form.Group className="mb-3">
                    <Form.Label>Driver</Form.Label>
                    <Form.Select
                        name="driver_id"
                        value={carData.driver_id || ''}
                        onChange={handleChangeCarData}
                    >
                        <option value="">Select a driver</option>
                        {driversData.map(driver => (
                            <option key={driver.id} value={driver.id}>
                                {driver.first_name} {driver.last_name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Вибір типу шин */}
                <Form.Group className="mb-3">
                    <Form.Label>Tire Type</Form.Label>-
                    <Form.Select
                        name="tire_type"
                        value={carData.tire_type || ''}
                        onChange={handleChangeCarData}
                    >
                        <option value="0">Winter</option>
                        <option value="1">Summer</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </div>
            </Form>
        </Container>
    );
}

export default EditCar;
