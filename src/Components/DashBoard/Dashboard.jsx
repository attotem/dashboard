import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomActiveShapePieChart from './CustomActiveShapePieChart';
import Linechart from './linechart';
import RadialChart from './RadialChart';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";
import { useSelectedPark } from '../../SelectedParkContext';
import { Container, Form, Button } from 'react-bootstrap';

function Dashboard() {
    const [chartData, setChartData] = useState([]);
    const [LastInvoices, setLastInvoices] = useState([]);
    const [Segment, setSegment] = useState("week");
    const navigate = useNavigate();

    const { selectedParkId } = useSelectedPark();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    function translate(text) {
        return translations[text] || text;
    }

    const translations = {
        "Title": "Název",
        "Expenses": "Výdaje",
        "Serviced vehicles": "Servisovaná vozidla",
        "Week": "Týden",
        "Month": "Měsíc",
        "Date": "Datum",
        "Note": "Poznámka",
        "Price": "Cena",
    };


    useEffect(() => {
        const cookie = document.cookie;
        let sessionId = cookie.split("=")[1];

        fetch(`https://ttestt.shop/cars/api/analytics/${Segment}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const formattedData = data.map(item => ({
                    date: formatDate(item.date), // Assuming you want to format the date here as well.
                    dailySpending: item.daily_spending,
                    servicedCarsPercentage: item.serviced_cars_percentage,
                }));
                setChartData(formattedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        fetch(`https://ttestt.shop/cars/api/invoices/last`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLastInvoices(data);
            })
            .catch(error => console.error("Error updating payment status:", error));
    }, [Segment, selectedParkId]);

    const lastDayData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (
        <>
            <div className="ml-5">
                <div className='d-flex'>
                    <div>
                        <div className='chart_wrapper'>
                            <div className='text_dashboard'>{translate("Title")}</div>
                            <CustomActiveShapePieChart />
                        </div>

                        <div className='chart_wrapper'>
                            <div className="mb-3 segment_select">
                                <select className="form-select" value={Segment} onChange={e => setSegment(e.target.value)}>
                                    <option value="week">{translate("Week")}</option>
                                    <option value="month">{translate("Month")}</option>
                                </select>
                            </div>

                            <div className='text_dashboard'>{translate("Expenses")}</div>
                            <Linechart data={chartData} />
                        </div>
                    </div>

                    <div className='chart_wrapper'>
                        <div className='text_dashboard'>{translate("Serviced vehicles")}</div>
                        {lastDayData && <RadialChart servicedCarsPercentage={lastDayData.servicedCarsPercentage} />}

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>{translate("Date")}</th>
                                    <th>{translate("Note")}</th>
                                    <th>{translate("Price")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LastInvoices.map((invoice, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(invoice.issued_on)}</td>
                                        <td>{invoice.note}</td>
                                        <td>{invoice.total_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );

}

export default Dashboard;
