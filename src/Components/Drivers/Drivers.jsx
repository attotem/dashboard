import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import Driver from './Driver';

function Drivers() {
    const [customersData, setCustomersData] = useState([]);
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_drivers?park_id=1", {
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