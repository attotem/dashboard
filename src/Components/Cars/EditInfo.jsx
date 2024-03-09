import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
    let { carId } = useParams();
    const navigate = useNavigate();

    const [serviceIntervalData, setServiceIntervalData] = useState(null);
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
                setServiceIntervalData(data.serviceInterval);
            })
            .catch(error => console.error("Error fetching car data:", error));
    }, [carId]);


    const handleChangeServiceIntervalData = (event) => {
        const { name, value } = event.target;
        setServiceIntervalData(prev => ({ ...prev, [name]: value }));
        setChangedServiceIntervalData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            id: carId,
            fields: changedServiceIntervalData,
        };

        fetch(`https://ttestt.shop/cars/api/update_service_interval`, {
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

    if (!serviceIntervalData) return <div>Loading...</div>;

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    <h3>Service Interval Information</h3>
                    {serviceIntervalData && Object.keys(serviceIntervalData).map(key => {
                        let label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Default label transformation
                        // Customize labels for specific keys
                        if (key === "tire_type_change_0") {
                            label = "Winter tire type change";
                        } else if (key === "tire_type_change_1") {
                            label = "Summer tire type change";
                        }

                        return (
                            <Form.Group className="mb-3" key={key}>
                                <Form.Label>{label}</Form.Label>
                                <Form.Control
                                    type={typeof serviceIntervalData[key] === "number" ? "number" : "text"}
                                    name={key}
                                    value={serviceIntervalData[key] || ''} // Ensure the value is not undefined
                                    onChange={handleChangeServiceIntervalData}
                                />
                            </Form.Group>
                        );
                    })}

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
