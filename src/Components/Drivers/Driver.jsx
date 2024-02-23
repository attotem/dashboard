import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./driver.css";

const Driver = ({ first_name, phone_number, last_name, experience, categories, park_id, post, salary, tg }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <tr className='TableRow' >
        <td className="py-3 table_text align-middle">{first_name}</td>
        <td className="py-3 table_text align-middle">{last_name}</td>
        <td className="py-3 table_text align-middle">{phone_number}</td>
        <td className="py-3 table_text align-middle">
          <div className='status_active' onClick={handleShow}>See more</div>
        </td>
      </tr>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Driver Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Categories: {categories}</p>
          <p>Experience: {experience}years</p>
          <p>Salary: {salary}$</p>
          <p>Post: {post}</p>
          <p>Telegram: {tg}</p>
          <p>Park id: {park_id}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Driver;
