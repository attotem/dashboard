import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = ({ first_name, last_name, email }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);



    const [editableFirstName, setEditableFirstName] = useState(first_name);
    const [editableLastName, setEditableLastName] = useState(last_name);
    const [editableEmail, setEditableEmail] = useState(email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            first_name: editableFirstName,
            last_name: editableLastName,
            email: editableEmail,
        };

        fetch("https://ttestt.shop/cars/api/update_user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            <tr onClick={handleShow}>
                <td className="py-3 align-middle">{first_name}</td>
                <td className="py-3 align-middle">{last_name}</td>
                <td className="py-3 align-middle">{email}</td>
                <td className="py-3 align-middle">
                    <div className='status_active'>See more</div>
                </td>
            </tr>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Email: {email}</p>
                    <p>First Name: {first_name}</p>
                    <p>Last Name: {last_name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default User;
