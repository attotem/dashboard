import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import bcrypt from 'bcryptjs';

function Create_park() {
    const [Email, setEmail] = useState('');
    const [First_name, setFirst_name] = useState('');
    const [Last_name, setLast_name] = useState('');
    const [Password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(Email)
        console.log(First_name)
        console.log(Last_name)
        console.log(Password)

        // fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/create_category/", {
        //     method: "POST",
        //     mode: "cors",
        //     cache: "no-cache",
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => {

        //     })
        //     .catch(error => { console.error("Ошибка при получении данных:", error); });
    };

    return (
        <>
            <Header />
            <Container>
                {/* <div className='title'>Create a new driver</div> */}
                <Form onSubmit={handleSubmit} className='w-75'>

                    <Form.Group className="mb-3" controlId="formAssistantName">
                        <Form.Label className='m-0'>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAssistantName">
                        <Form.Label className='m-0'>
                            First_name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First_name"
                            value={First_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAssistantName">
                        <Form.Label className='m-0'>
                            Last_name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last_name "
                            value={Last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAssistantName">
                        <Form.Label className='m-0'>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline" type="button" className='cancel_create'>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='submit_create'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>

        </>

    );
}

export default Create_park;
