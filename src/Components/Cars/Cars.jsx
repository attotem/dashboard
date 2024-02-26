import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarsCard from './CarsCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


function Cars() {
    const [customersData, setCustomersData] = useState([]);
    const navigate = useNavigate();
    

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
                console.log(data)
                setCustomersData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    function AddCar() {
        navigate(`/add_car`)
    }
    return (
        <>

            <div className='header_cars'>
                <button className="btn btn-primary" onClick={AddCar}>
                    <AddIcon />
                </button>
            </div>


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