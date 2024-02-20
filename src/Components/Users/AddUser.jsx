import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import bcrypt from 'bcryptjs';
import { Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';
function AddUser() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const hashedPassword = bcrypt.hashSync(password, 10);

        const userData = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            hashed_password: hashedPassword,
            is_superuser: false,
        };

        fetch("https://ttestt.shop/cars/api/add_user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('User successfully added!');
            })
            .catch(error => {
                console.error("Ошибка при отправке формы:", error);
                alert('Error: Could not add user.');
            });
    };

    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={handleSubmit} className='w-75'>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeSlashFill /> : <EyeFill />}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" className='cancel_create'>
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

export default AddUser;
