import React, { useEffect, useState } from 'react';
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_users", {
            method: "GET",
            cache: "no-cache"
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
