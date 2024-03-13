import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
    let { carId } = useParams();
    const navigate = useNavigate();

    const [carData, setCarData] = useState({});
    const [serviceIntervalData, setServiceIntervalData] = useState({});
    const [driversData, setDriversData] = useState([]);

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/cars/get?id=${carId}`, {
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

        fetch(`https://ttestt.shop/cars/api/drivers/getAll`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            }
        })
            .then(response => response.json())
            .then(setDriversData)
            .catch(error => console.error("Error fetching drivers data:", error));
    }, [carId]);

    const handleChangeCarData = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === "driver_id" && value === "" ? null : value;
        const finalValue = name === "tire_type" ? Number(value) : updatedValue;
        setCarData(prevData => ({
            ...prevData,
            [name]: finalValue
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            id: carId,
            fields: { ...carData },
        };
        console.log(updatedData)

        fetch(`https://ttestt.shop/cars/api/cars/update`, {
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
                navigate(-1);
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
                {Object.keys(carData).map(key => {
                    if (key === "tire_type") {
                        return (
                            <Form.Group className="mb-3" key={key}>
                                <Form.Label>Tire Type</Form.Label>
                                <Form.Select
                                    name={key}
                                    value={carData[key]}
                                    onChange={handleChangeCarData}
                                >
                                    <option value="0">Winter</option>
                                    <option value="1">Summer</option>
                                    <option value="-1">All seasons</option>
                                </Form.Select>
                            </Form.Group>
                        );
                    } else if (key === "driver_id") {
                        return (
                            <Form.Group className="mb-3" key={key}>
                                <Form.Label>Driver</Form.Label>
                                <Form.Select
                                    name={key}
                                    value={carData[key] || ''}
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
                        );
                    } else {
                        return (
                            <Form.Group className="mb-3" key={key}>
                                <Form.Label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={key}
                                    placeholder={`Enter ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
                                    value={carData[key]}
                                    onChange={handleChangeCarData}
                                />
                            </Form.Group>
                        );
                    }
                })}


                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </div>
            </Form>
        </Container>
    );
}

export default EditCar;
