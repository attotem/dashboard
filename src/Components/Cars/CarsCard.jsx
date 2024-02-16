import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cars.css"
const CarsCard = ({ brandLogo, brandName, distance, statusColor }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body text-center">
                    <img src={brandLogo} alt={brandName} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{brandName}</h5>
                    <p className="card-text">{distance} km</p>
                    <div className="car_status"></div>
                </div>
            </div>
        </div>
    );
};

export default CarsCard