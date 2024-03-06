import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';

function PaymentsHistory() {
    const [customersData, setCustomersData] = useState([]);
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const { selectedParkId } = useSelectedPark();

    // useEffect(() => {
    //     fetch(`https://ttestt.shop/cars/api/invoices/history/park`, {
    //         method: "GET",
    //         cache: "no-cache",
    //         headers: {
    //             "Authorization": `Bearer ${sessionId}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setCustomersData(data);
    //             console.log(data)
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, [selectedParkId]);


    return (
        <>
            <div className="container mt-5">
                <div className="table-responsive">
                    
                </div>
            </div>
        </>
    );
}

export default PaymentsHistory;