import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomActiveShapePieChart from './CustomActiveShapePieChart';
import Linechart from './linechart';
import RadialChart from './RadialChart';
import "./dashboard.css";
import { useSelectedPark } from '../../SelectedParkContext';

function Dashboard() {
    const [chartData, setChartData] = useState([]);
    const [LastInvoices, setLastInvoices] = useState([]);

    const { selectedParkId } = useSelectedPark();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };


    useEffect(() => {
        const cookie = document.cookie;
        let sessionId = cookie.split("=")[1];

        fetch(`https://ttestt.shop/cars/api/analytics/week`, {
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
                    date: item.date,
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
    }, [selectedParkId]);

    const lastDayData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (
        <>
            <div className="ml-5">
                <div className='d-flex'>
                    <div>
                        <div className='chart_wrapper'>
                            <div className='text_dashboard'>Title</div>
                            <CustomActiveShapePieChart />
                        </div>

                        <div className='chart_wrapper'>
                            <div className='text_dashboard'>Expenses</div>
                            <Linechart data={chartData} />
                        </div>
                    </div>

                    <div className='chart_wrapper'>
                        <div className='text_dashboard'>Serviced vehicles</div>
                        {lastDayData && <RadialChart servicedCarsPercentage={lastDayData.servicedCarsPercentage} />}


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Note</th>
                                    <th>Price</th>
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

                {/* Display Last Invoices here */}
                {/* <div className='last-invoices'>
                    <h3>Last Invoices</h3>
                    {LastInvoices.map((invoice, index) => (
                        <div key={index} className='invoice-detail'>
                            <p>Date Issued: {invoice.issued_on}</p>
                            <p>Note: {invoice.note}</p>
                            <p>Total Amount: {invoice.total_amount}</p>
                        </div>
                    ))}
                </div> */}
            </div>
        </>
    );
}

export default Dashboard;
