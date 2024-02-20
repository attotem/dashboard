import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import User from './User'; 

function AllUsers() {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_users", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                setUsersData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>All Users</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user, index) => (
                                <User key={index}
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    email={user.email}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AllUsers;
