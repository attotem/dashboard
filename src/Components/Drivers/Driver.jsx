import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./driver.css";
import { useNavigate } from 'react-router-dom';

const Driver = ({ first_name, phone_number, last_name, experience, categories, park_id, post, salary, tg, id }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();


  function EditDriver() {
    navigate(`/edit_driver/${id}`)
  }
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
        <Modal.Footer className='d-flex justify-content-between'>
          <button className="cancel_modal" onClick={handleClose}>Close</button>
          <button className='edit_modal' onClick={EditDriver}>Edit driver</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Driver;
