import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import Driver from './Driver';

function Drivers() {
    const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_drivers?park_id=1", {
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
            <Header />
            <div className="container mt-5">
                <h2>All Drivers</h2>
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
                                    phone_number={customer.phone_number}
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