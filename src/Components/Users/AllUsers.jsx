import React, { useEffect, useState } from 'react';
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';

function AllUsers() {
    const [users, setUsers] = useState([]);

    console.log(document.cookie)

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
                setUsers(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2>All Users</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {users.map((user, index) => (
                    <User key={index} {...user} />
                ))}
            </div>
        </div>
    );
}

export default AllUsers;
