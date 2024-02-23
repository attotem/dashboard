import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarsCard from './CarsCard';
import Header from '../Header/header'
import image1 from "./image1.png"


function Cars() {
    const [customersData, setCustomersData] = useState([]);


    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_park_cars?park_id=1", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                let new_data = []
                for (let i = 0; i < data.length; i++) {
                    new_data.push({ brandLogo: image1, brandName: data[i].brand, distance: data[i].kms, statusColor: 'green' })
                }
                console.log(new_data)
                setCustomersData(new_data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {customersData.map((car, index) => (
                        <CarsCard key={index} {...car} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Cars