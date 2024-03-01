import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';

function PaymentsHistory() {
    const [customersData, setCustomersData] = useState([]);
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const { selectedParkId } = useSelectedPark();

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/invoices/history/park`, {
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


    return (
        <>
            <div className="container mt-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Data</th>
                                <th className='table_header'>Text</th>
                                <th className='table_header'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersData.map((data) => (
                                <tr className='TableRow' >
                                    <td className="py-3 table_text align-middle">{data.issued_on}</td>
                                    <td className="py-3 table_text align-middle">{data.note}</td>
                                    <td className="py-3 table_text align-middle">{data.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PaymentsHistory;