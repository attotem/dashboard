import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ParkAdmin = ({ brandLogo, brandName, distance, name, id, SuperUser }) => {
    const navigate = useNavigate();

    function upate_session() {
        console.log(id)
        const cookie = document.cookie;
        let sessionId = cookie.split("=")[1];

        fetch("https://ttestt.shop/cars/api/update_session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionId}`

            },
            cache: "no-cache",
            body: JSON.stringify(
                {
                    id: id
                })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });


        navigate("/cars")

    }

    return (
        <div className="col">
            <div className="card" onClick={upate_session}>
                <div className="card-body text-center">
                    <img src={brandLogo} alt={brandName} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default ParkAdmin;
