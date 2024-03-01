import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useSelectedPark } from '../../SelectedParkContext';
import Payment from './Payment';
import { Container, Row, Col } from 'react-bootstrap';



function Upcoming() {
    const cookie = document.cookie
    let sessionId = cookie.split("=")[1];
    const [customersData, setCustomersData] = useState([]);
    const [parkData, setparkData] = useState([]);
    const navigate = useNavigate();
    const storedIsSuperuser = localStorage.getItem('isSuperuser');

    const { selectedParkId } = useSelectedPark();
    // const paymentsData = [
    //     { id: 1, orderId: '751', requestDate: '20.09.2022 12:00', executionDate: '02.01.2022 15:00', price: 'хуй' },
    //     { id: 2, orderId: '751', requestDate: '20.09.2022 12:00', executionDate: '02.01.2022 15:00', price: '500 грн.' },
    //     { id: 3, orderId: '751', requestDate: '20.09.2022 12:00', executionDate: '02.01.2022 15:00', price: '500 грн' },
    //     { id: 4, orderId: '751', requestDate: '20.09.2022 12:00', executionDate: '02.01.2022 15:00', price: '500 грн.' },
    //     { id: 5, orderId: '751', requestDate: '20.09.2022 12:00', executionDate: '02.01.2022 15:00', price: '500 грн.' },
    //     { id: 6, orderId: '751', requestDate: '20.09.2022 12:00', executionDate: '02.01.2022 15:00', price: '500 грн.' },
    // ];

    useEffect(() => {
        fetch(`https://ttestt.shop/cars/api/services/upcoming/car`, {
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


    // function AddCar() {
    //     navigate(`/add_car`)
    // }
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

export default Upcoming