import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';

function EditCar({ match }) {
    const [carData, setCarData] = useState({
    });

    useEffect(() => {
        const carId = match.params.id;
        fetch(`https://ttestt.shop/cars/api/car/${carId}`)
            .then(response => response.json())
            .then(data => setCarData(data))
            .catch(error => {
                console.error("Error fetching car data:", error);
                alert('Error: Could not load car data.');
            });
    }, [match.params.id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCarData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const carId = match.params.id;
        // fetch(`https://ttestt.shop/cars/api/update_car/${carId}`, {
        //     method: "PUT", 
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(carData)
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log(data);
        //     alert('Car successfully updated!');
        // })
        // .catch(error => {
        //     console.error("Error updating car:", error);
        //     alert('Error: Could not update car.');
        // });
    };

    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    {/* Form fields here, same as the AddCar component */}
                    {/* ... */}
                    <Button variant="primary" type="submit">Update Car</Button>
                </Form>
            </Container>
        </>
    );
}

export default EditCar;
