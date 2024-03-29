import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import Driver from './Driver';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';
import translations from "../translations.json"

function Drivers() {
    const [customersData, setCustomersData] = useState([]);
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const { selectedParkId } = useSelectedPark();

    function translate(key) {
        return translations[key] || key;
    }

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/drivers/getAll`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCustomersData(data);
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [selectedParkId]);

    function handleNavigate() {
        navigate(`/driver_create`)

    }

    const [CarsData, setCarsData] = useState([]);
    const navigate = useNavigate();

    const fetchDrivers = () => {
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
                setCarsData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => {
        fetchDrivers();
    }, [selectedParkId]);

    return (
        <>
            <div className="container mt-5">
                <div className='d-flex justify-content-between'>
                    <h2>{translate("All Drivers")}</h2>
                    <div className='add_button' onClick={handleNavigate}>
                        <AddIcon style={{ fontSize: '2rem', color: "white", fontWeight: "600" }} />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header '></th>
                                <th className='table_header '>{translate("First name")}</th>
                                <th className='table_header '>{translate("Last name")}</th>
                                <th className='table_header '>{translate("Phone number")}</th>
                                <th className='table_header '>{translate("Car")}</th>
                                <th className='table_header '></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersData.map((customer, index) => (
                                <Driver key={index}
                                    first_name={customer.first_name}
                                    last_name={customer.last_name}
                                    experience={customer.experience}
                                    categories={customer.categories}
                                    park_id={customer.park_id}
                                    post={customer.post}
                                    salary={customer.salary}
                                    whatsapp={customer.whatsapp}
                                    phone_number={customer.phone_number}
                                    id={customer.id}
                                    car_brand={customer.car_brand}
                                    car_id={customer.car_id}
                                    car_model={customer.car_model}
                                    photo={customer.photo}
                                    CarsData={CarsData}
                                    onDriverUpdated={fetchDrivers}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}

export default Drivers;