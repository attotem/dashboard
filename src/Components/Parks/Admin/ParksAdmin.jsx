import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParkAdmin from './ParkAdmin';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function ParksAdmin() {
    const [customersData, setCustomersData] = useState([]);
    const navigate = useNavigate();
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_parks", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCustomersData(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    function AddPark() {
        navigate(`/add_park`)
    }


    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {customersData.map((park, index) => (
                        <ParkAdmin key={index} {...park} />
                    ))}

                </div>
            </div>
        </>
    );
}

export default ParksAdmin;
