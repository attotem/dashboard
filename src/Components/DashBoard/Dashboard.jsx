import React, { useEffect, useState } from 'react';
import Card from "./Card"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Header from '../Header/header';
import TinyAreaChart from './TinyAreaChart';
import SimpleBarChart from './BarChart';
import CustomActiveShapePieChart from './CustomActiveShapePieChart';
import Linechart from './linechart';
import RadialChart from './RadialChart';
import "./dashboard.css"


function Dashboard() {
    const [chartData, setChartData] = useState([]);

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
    }, []);

    const lastDayData = chartData.length > 0 ? chartData[chartData.length - 1] : null;


    return (
        <>
            <dashboard className="ml-5">
                <div >

                    <div className='d-flex'>
                        <div>
                            <div className='chart_wrapper' >
                                <CustomActiveShapePieChart />
                            </div>
                            <div className='chart_wrapper'>
                                <Linechart data={chartData} />
                            </div>


                        </div>
                        <div className='chart_wrapper'>
                            {lastDayData && (
                                <RadialChart servicedCarsPercentage={lastDayData.servicedCarsPercentage} />
                            )}
                        </div>

                    </div>






                </div>
            </dashboard >
        </>
    )
}

export default Dashboard
