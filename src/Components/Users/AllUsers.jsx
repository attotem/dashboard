import React, { useEffect, useState } from 'react';
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';

function AllUsers() {
    const [users, setUsers] = useState([]);


    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_users", {
            method: "GET",
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2>All Users</h2>

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
                    {users.map((user, index) => (
                        <User key={index} {...user} />
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default AllUsers;
