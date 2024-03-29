import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarsCard from './CarsCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';

function Cars() {
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const [customersData, setCustomersData] = useState([]);
    const navigate = useNavigate();

    const { selectedParkId } = useSelectedPark();

    const fetchCars = () => {
        fetch(`https://ttestt.shop/cars/api/cars/getAll`, {
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
    }
    useEffect(() => {
        fetchCars()
    }, [selectedParkId]);


    function AddCar() {
        navigate(`/add_car`)
    }
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {customersData.map((car, index) => (
                        <CarsCard fetchCars={fetchCars} key={index} {...car} />
                    ))}
                    <div className="col" onClick={AddCar} style={{ cursor: 'pointer' }}>
                        <div className="card h-100 d-flex justify-content-center align-items-center">
                            <AddIcon style={{ fontSize: '4rem', color: "#B6332E" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cars