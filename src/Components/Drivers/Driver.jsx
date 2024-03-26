import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./driver.css";
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import translations from "../translations.json"
import nophoto from "./nophoto.jpg"
import VisibilityIcon from '@mui/icons-material/Visibility';
const Driver = ({ first_name, phone_number, last_name, experience, categories, park_id, post, salary, whatsapp, id, car_brand, car_id, car_model, photo, CarsData = [], onDriverUpdated }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();


  function EditDriver() {
    navigate(`/edit_driver/${id}`)
  }


  function translate(key) {
    return translations[key] || key;
  }



  const cookie = document.cookie
  let sessionId = cookie.split("=")[1];

  function DeleteDriver() {
    fetch(`https://ttestt.shop/cars/api/drivers/remove`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionId}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Driver deleted');
        onDriverUpdated(); // Вызов функции для обновления списка водителей
      })
      .catch(error => {
        console.log(error);
      });
  }



  console.log(photo)

  return (
    <>
      <tr className='TableRow' >
        <td className="py-3 table_text align-middle center_photo">
          <img className='driver_photo' src={photo == null ? nophoto : photo} alt="Driver"></img>
        </td>
        <td className="py-3 table_text align-middle">{first_name}</td>
        <td className="py-3 table_text align-middle">{last_name}</td>
        <td className="py-3 table_text align-middle">{phone_number}</td>
        <td className="py-3 table_text align-middle">
          <Form.Group>
            <Form.Select
            >
              {car_id != null ?
                <option value={car_id} >{car_brand} {car_model}</option>
                :
                <option value={null} >No car selected</option>
              }
              {CarsData.map((car, index) => (
                <option value={car.id} >{car.brand} {car.model}</option>

              ))}
            </Form.Select>
          </Form.Group></td>
        <td className="py-3 table_text align-middle">
          <div className='status_active' onClick={handleShow}><VisibilityIcon /></div>
        </td>
      </tr>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{last_name} {first_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{translate("Categories")}: {categories}</p>
          <p>{translate("Experience")}: {experience} {translate("years")}</p>
          <p>{translate("Salary")}: {salary}$</p>
          <p>{translate("Post")}: {post}</p>
          <p>{translate("Whatsapp")}: {whatsapp}</p>
          <p>{translate("Park id")}: {park_id}</p>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant="outline-secondary" type="button" className='d-flex align-items-center' onClick={DeleteDriver}>
            <DeleteForeverIcon /> {translate("Delete")}
          </Button>
          <button className='edit_modal' onClick={EditDriver}>{translate("Edit driver")}</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Driver;
