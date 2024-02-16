import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Park from './Park';
function Parks() {

    const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_parks?user_id=3", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                setCustomersData(data);
                console.log(data)
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
                        <Park key={index} {...car} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Parks