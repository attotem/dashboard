import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Park = ({ brandLogo, brandName, distance, name }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body text-center">
                    <img src={brandLogo} alt={brandName} className="card-img-top" style={{ width: '50px' }} />
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{distance} km</p>
                </div>
            </div>
        </div>
    );
};

export default Park