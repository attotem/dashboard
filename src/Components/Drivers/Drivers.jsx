import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import Driver from './Driver';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';

function Drivers() {
    const [customersData, setCustomersData] = useState([]);
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const { selectedParkId } = useSelectedPark();



    useEffect(() => {
        const storedUserId = localStorage.getItem('id');

        fetch(`https://ttestt.shop/cars/api/getAll_drivers`, {
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
    const navigate = useNavigate();



    return (
        <>
            <div className="container mt-5">
                <div className='d-flex justify-content-between'>
                    <h2>All Drivers</h2>
                    <div className='add_button' onClick={handleNavigate}>
                        <AddIcon style={{ fontSize: '2rem', color: "white", fontWeight: "600" }} />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>First name</th>
                                <th className='table_header'>Last name</th>
                                <th className='table_header'>Phone number</th>
                                <th className='table_header'></th>
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
                                    tg={customer.tg}
                                    phone_number={customer.phone_number}
                                    id={customer.id}
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