import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = ({ first_name, last_name, email }) => {
    return (
        <tr>
            <td className="py-3 align-middle">{first_name}</td>
            <td className="py-3 align-middle">{last_name}</td>
            <td className="py-3 align-middle">{email}</td>
            <td className="py-3 align-middle">
                <div className='status_active'>See more</div>
            </td>
        </tr>
    );
};

export default User;
