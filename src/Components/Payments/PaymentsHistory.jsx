import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';
import { Container, Row, Col } from 'react-bootstrap';
import HistoryIcon from '@mui/icons-material/History';
import Payment from './Payment';

function Calendar() {
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const [customersData, setCustomersData] = useState([]);
    const navigate = useNavigate();

    const { selectedParkId } = useSelectedPark();


    useEffect(() => {
        fetch(`https://ttestt.shop/cars//api/invoices/park`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCustomersData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [selectedParkId]);

    return (
        <>
            <Container>
                <Row>
                    {customersData.map(payment => (
                        <Col key={payment.id} sm={12} md={6} lg={4}>
                            <Payment {...payment} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Calendar