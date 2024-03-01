import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./driver.css";
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Driver = ({ first_name, phone_number, last_name, experience, categories, park_id, post, salary, tg, id }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();


  function EditDriver() {
    navigate(`/edit_driver/${id}`)
  }
  const cookie = document.cookie
  let sessionId = cookie.split("=")[1];
  function DeleteDriver() {
    fetch(`https://ttestt.shop/cars/api/remove_driver`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionId}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then(response => {

      })
      .then(data => {
      })
      .catch(error => {

      });
  };

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
          <button className="cancel_modal" onClick={DeleteDriver}><DeleteForeverIcon /></button>
          <button className='edit_modal' onClick={EditDriver}>Edit driver</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Driver;
