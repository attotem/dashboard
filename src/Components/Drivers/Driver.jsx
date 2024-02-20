import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./driver.css"
const Driver = ({ first_name, phone_number, last_name }) => {

  return (
    <tr className='TableRow' >
      <td className="py-3 table_text align-middle">{first_name}</td>
      <td className="py-3 table_text align-middle">{last_name}</td>
      <td className="py-3 table_text align-middle">{phone_number}</td>
      <td className="py-3 table_text align-middle"><div className='status_active'>See more</div></td>
    </tr>
  );
};
export default Driver;

