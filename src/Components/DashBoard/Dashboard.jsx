import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomActiveShapePieChart from './CustomActiveShapePieChart';
import Linechart from './linechart';
import RadialChart from './RadialChart';
import "./dashboard.css";
import { useSelectedPark } from '../../SelectedParkContext';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import translations from "../translations.json"

function Dashboard() {
    const [chartData, setChartData] = useState([]);
    const [showDateSelector, setShowDateSelector] = useState(true);
    const [LastInvoices, setLastInvoices] = useState([]);
    const [todayPercentage, setTodayPercentage] = useState(null);

    const { selectedParkId } = useSelectedPark();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 7));

    const toggleDateSelector = () => {
        setShowDateSelector(prevState => !prevState);
    };

    const dateSelectorRef = useRef(null);

    const handleClickOutside = event => {
        if (dateSelectorRef.current && !dateSelectorRef.current.contains(event.target)) {
            setShowDateSelector(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    function translate(text) {
        return translations[text] || text;
    }

    const handleSelect = (item) => {
        const { startDate, endDate } = item.selection;
        setStartDate(startDate);
        setEndDate(endDate);
    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    };


    const lastDayData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const fetchData = async () => {
        const startFormat = startDate.toISOString().split('T')[0];
        const endFormat = endDate.toISOString().split('T')[0];
        const sessionId = document.cookie.split("=")[1];

        const today = new Date().toISOString().split('T')[0];

        try {
            const analyticsResponse = await fetch(`https://ttestt.shop/cars/api/analytics/custom?start_date=${startFormat}&end_date=${endFormat}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionId}`
                }
            });

            if (!analyticsResponse.ok) throw new Error('Analytics fetch failed');
            const analyticsData = await analyticsResponse.json();

            const mappedData = analyticsData.map(item => ({
                date: formatDate(item.date),
                dailySpending: item.daily_spending,
                servicedCarsPercentage: item.serviced_cars_percentage,
            }));

            setChartData(mappedData);

            const todayData = mappedData.find(item => item.date === today);
            if (todayData) {
                setTodayPercentage(todayData.servicedCarsPercentage);
            }
        } catch (error) {
            console.error("Fetching error:", error);
        }
    };


    useEffect(() => {
        const sessionId = document.cookie.split("=")[1];

        fetch(`https://ttestt.shop/cars/api/invoices/last`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLastInvoices(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [])

    useEffect(() => {
        fetchData();


    }, [startDate, endDate, selectedParkId]);

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
                            <div className="mb-3">
                                {showDateSelector ? null :
                                    <button className="btn btn-primary date_selector_button" onClick={toggleDateSelector}>
                                        Show Date Selector
                                    </button>}
                            </div>

                            {showDateSelector && (
                                <div className="mb-3 segment_select" ref={dateSelectorRef}>
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        onChange={handleSelect}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={1}
                                        direction="horizontal"
                                    />
                                </div>
                            )}


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
                                        <td>{Math.ceil(invoice.total_amount)}</td>
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
