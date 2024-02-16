import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarsCard from './CarsCard';
import image1 from "./image1.png"
function Cars() {

    const cars = [
        { brandLogo: image1, brandName: 'Audi RS7', distance: '75000', statusColor: 'green' },
        { brandLogo: image1, brandName: 'Audi RS7', distance: '75000', statusColor: 'green' },
        { brandLogo: image1, brandName: 'Audi RS7', distance: '75000', statusColor: 'green' },
        { brandLogo: image1, brandName: 'Audi RS7', distance: '75000', statusColor: 'green' },
        { brandLogo: image1, brandName: 'Audi RS7', distance: '75000', statusColor: 'green' },
    ];

    
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {cars.map((car, index) => (
                        <CarsCard key={index} {...car} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Cars