import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const User = ({ first_name, last_name, email, id }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const navigate = useNavigate();
    function EditUser() {
        navigate(`/edit_user/${id}`)
    }

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
                <Modal.Footer className='d-flex justify-content-between'>
                    <button className="cancel_modal" onClick={handleClose}>Close</button>
                    <button className='edit_modal' onClick={EditUser}>Edit user</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default User;
