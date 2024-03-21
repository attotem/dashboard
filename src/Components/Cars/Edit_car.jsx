import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import translations from "../translations.json"

function EditCar() {
    let { carId } = useParams();
    const navigate = useNavigate();



    function translate(text) {
        return translations[text] || text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

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
        setCarData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            id: carId,
            fields: { ...carData },
        };

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
                alert('Auto bylo úspěšně aktualizováno!');
                navigate(-1);
            })
            .catch(error => {
                console.error("Chyba při aktualizaci auta:", error);
                alert('Chyba: Auto nebylo možné aktualizovat.');
            });
    };

    if (!carData || !serviceIntervalData) return <div>Načítání...</div>;

    const excludedFields = ['image', 'park_id', 'service_interval_id', 'id']; // Исключаемые поля

    return (
        <Container>
            <Form onSubmit={handleSubmit} className='w-75'>
                {Object.keys(carData).filter(key => !excludedFields.includes(key)).map(key => {
                    const label = translate(key);
                    const isSelectField = key === "tire_type" || key === "driver_id";
                    const selectOptions = key === "tire_type" ? [
                        { value: "0", label: translate("Winter") },
                        { value: "1", label: translate("Summer") },
                        { value: "-1", label: translate("All seasons") },
                    ] : driversData.map(driver => ({
                        value: driver.id.toString(),
                        label: `${driver.first_name} ${driver.last_name}`
                    }));

                    return (
                        <Form.Group className="mb-3" key={key}>
                            <Form.Label>{label}</Form.Label>
                            {isSelectField ? (
                                <Form.Select
                                    name={key}
                                    value={carData[key]}
                                    onChange={handleChangeCarData}
                                >
                                    {selectOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    type="text"
                                    name={key}
                                    placeholder={`Zadejte ${label}`}
                                    value={carData[key]}
                                    onChange={handleChangeCarData}
                                />
                            )}
                        </Form.Group>
                    );
                })}

                <div className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={() => navigate(-1)}>Zrušit</Button>
                    <Button variant="primary" type="submit">Uložit změny</Button>
                </div>
            </Form>
        </Container>
    );
}

export default EditCar;
