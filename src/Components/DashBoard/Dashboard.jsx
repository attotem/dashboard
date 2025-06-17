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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { API_BASE_URL } from '../url';
import NoData from './NoData';
import { fetchCustomPieChart,fetchAnalytics,fetchLastInvoices,fetchServiced} from '../../http';
function Dashboard() {

    const [chartData, setChartData] = useState([]);
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [LastInvoices, setLastInvoices] = useState([]);
    const [todayPercentage, setTodayPercentage] = useState(0)

    const { selectedParkId } = useSelectedPark();


    const today = new Date();
    const lastWeek = addDays(new Date(), -60);
    const [startDate, setStartDate] = useState(lastWeek);
    const [endDate, setEndDate] = useState(today);
    const [customPieChartStartDate, setCustomPieChartStartDate] = useState(lastWeek);
    const [customPieChartEndDate, setCustomPieChartEndDate] = useState(today);

    const [customPieChartData, setCustomPieChartData] = useState([]);
    const [showCustomPieChartDateSelector, setShowCustomPieChartDateSelector] = useState(false);


    const toggleDateSelector = () => {
        setShowDateSelector(prevState => !prevState);
    };

    const dateSelectorRef = useRef(null);

    const handleClickOutside = event => {
        if (dateSelectorRef.current && !dateSelectorRef.current.contains(event.target)) {
            setShowDateSelector(false);
            setShowCustomPieChartDateSelector(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}.${month}`;
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

    const fetchCustomPieChartData = async () => {
        const startFormat = customPieChartStartDate.toISOString().split('T')[0];
        const endFormat = customPieChartEndDate.toISOString().split('T')[0];
        const data = await fetchCustomPieChart(startFormat,endFormat);

        const formattedData = data.map(item => ({
            name: `${item.car[0]} ${item.car[1]}`,
            value: item.expenses
        }));
        setCustomPieChartData(formattedData);
        
    };


    const fetchData = async () => {
        const startFormat = startDate.toISOString().split('T')[0];
        const endFormat = endDate.toISOString().split('T')[0];
    
        const analyticsData = await fetchAnalytics(startFormat, endFormat);
    
        const mappedData = analyticsData.map(item => ({
            date: item.date, 
            dailySpending: item.daily_spending,
            servicedCarsPercentage: item.serviced_cars_percentage,
        }));
    
        setChartData(mappedData);

    
        const todayData = mappedData[0] 
    
        if (todayData) {
            if (todayData.servicedCarsPercentage !== null) {
                setTodayPercentage(todayData.servicedCarsPercentage);
            } else {
                setTodayPercentage(todayData.servicedCarsPercentage);            }
        } else {
            setTodayPercentage(0);
        } 
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const fetchAndSetLastInvoices = async () => {
        try {
            const lastInvoices = await fetchLastInvoices();
            setLastInvoices(lastInvoices);
        } catch (error) {
            console.error('Error fetching last invoices:', error);
        }
    };

    const fetchAndSetServiced = async () => {
        try {
            const serviced = await fetchServiced();
            setTodayPercentage(serviced);
        } catch (error) {
            console.error('Error fetching serviced data:', error);
        }
    };

    useEffect(() => {
        if (selectedParkId) {
            fetchAndSetLastInvoices();
            fetchAndSetServiced();
        }
    }, [selectedParkId]);


    const customStaticRanges = [
        {
            label: 'Včera',
            range: () => ({
                startDate: addDays(new Date(), -1),
                endDate: addDays(new Date(), -1),
            }),
            isSelected: (range) => {
                const { startDate, endDate } = range;
                const today = new Date();
                return startDate.getDate() === today.getDate() &&
                    endDate.getDate() === today.getDate();
            }
        },
        {
            label: 'Posledních 7 dní',
            range: () => ({
                startDate: addDays(new Date(), -7),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                const { startDate, endDate } = range;
                const today = new Date();
                return startDate.getDate() === today.getDate() &&
                    endDate.getDate() === today.getDate();
            }
        },
        {
            label: 'Posledních 30 dní',
            range: () => ({
                startDate: addDays(new Date(), -30),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                const { startDate, endDate } = range;
                const today = new Date();
                return startDate.getDate() === today.getDate() &&
                    endDate.getDate() === today.getDate();
            }
        },
        {
            label: 'Tento měsíc',
            range: () => ({
                startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
            }),
            isSelected: (range) => {
                const { startDate, endDate } = range;
                const today = new Date();
                return startDate.getDate() === today.getDate() &&
                    endDate.getDate() === today.getDate();
            }
        },
        {
            label: 'Minulý měsíc',
            range: () => ({
                startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
            }),
            isSelected: (range) => {
                const { startDate, endDate } = range;
                const today = new Date();
                return startDate.getDate() === today.getDate() &&
                    endDate.getDate() === today.getDate();
            }
        }
    ];

    const locale = {
        ...cs,
        format: 'dd/MM/yyyy',
        customRangeLabel: 'Vlastní rozsah',
        daysUpToToday: 'dny až do dneška',
        daysStartingToday: 'dny počínaje dneškem',
    };

    useEffect(() => {
        fetchCustomPieChartData();
    }, [customPieChartStartDate, customPieChartEndDate, selectedParkId]);

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, selectedParkId]);

    const formatDateTable = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'd MMMM', { locale: cs });
    };

    return (
        <>
            <div className="ml-5">
                <div className='d-flex'>
                    <div>
                        <div className='chart_wrapper' style={{ width: "50vw", height: "38vh" }}>
                            <div className='text_dashboard'>Výdaje</div>
                            <div className='d-flex justify-content-end w-100' >
                                <div className="mb-3">
                                    <div className='d-flex justify-content-center date-select' onClick={() => setShowCustomPieChartDateSelector(!showCustomPieChartDateSelector)}>
                                        {translate("Select date")}
                                        <CalendarMonthIcon style={{ zIndex: 1000, position: 'relative', marginLeft: '0.2rem' }} />
                                    </div>

                                </div>
                            </div>

                            {showCustomPieChartDateSelector && (
                                <div className="mb-3 segment_select" ref={dateSelectorRef}>

                                    <DateRangePicker
                                        ranges={[{
                                            startDate: customPieChartStartDate,
                                            endDate: customPieChartEndDate,
                                            key: 'selection',
                                        }]}
                                        onChange={(item) => {
                                            setCustomPieChartStartDate(item.selection.startDate);
                                            setCustomPieChartEndDate(item.selection.endDate);
                                        }}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={1}
                                        direction="horizontal"
                                        rangeColors={['rgb(182, 51, 46)']}
                                        locale={locale}
                                        staticRanges={customStaticRanges}
                                        inputRanges={[]}

                                    />

                                </div>
                            )}
                            <div className='d-flex'>

                                {customPieChartData.length > 0 ? (
                                    <>
                                        <CustomActiveShapePieChart data={customPieChartData} />

                                        <div className='expenses_table'>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>{translate("Car")}</th>
                                                        <th>{translate("Expenses")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customPieChartData.map((car, index) => (
                                                        <tr key={index}>
                                                            <td>{car.name}</td>
                                                            <td>{car.value} Kč</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>


                                ) : (<NoData />)}

                            </div>


                        </div>

                        <div className='chart_wrapper' style={{ width: "50vw", height: "38vh" }}>
                            <div className='d-flex justify-content-end w-100'>
                                <div className="mb-3">
                                    <div className='d-flex justify-content-center date-select' onClick={toggleDateSelector}>
                                        {translate("Select date")}
                                        <CalendarMonthIcon style={{ zIndex: 1000, position: 'relative', marginLeft: '0.2rem' }} />
                                    </div>
                                </div>
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
                                        rangeColors={['rgb(182, 51, 46)']}
                                        locale={locale}
                                        staticRanges={customStaticRanges}
                                        inputRanges={[]}
                                    />
                                </div>
                            )}

                            <div className='text_dashboard'>{translate("Expenses")}</div>
                            {chartData.length > 0 && chartData.every(item => item.dailySpending === 0) ? (
                                <div className='d-flex'>
                                    <NoData />
                                </div>
                            ) : (
                                <Linechart data={chartData} />
                            )}
                        </div>

                    </div>

                    <div className='chart_wrapper' >
                        <div className='text_dashboard'>{translate("Serviced vehicles")}</div>
                        <div style={{ width: "25vw", height: "40vh" }}>
                            <RadialChart servicedCarsPercentage={todayPercentage} />

                        </div>
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th>{translate("Date")}</th>
                                    <th>{translate("Note")}</th>
                                    <th>{translate("Price")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(Array.isArray(LastInvoices) && LastInvoices.length > 0) ? (
                                    LastInvoices.map((invoice, index) => (
                                        <tr key={index}>
                                            <td>{formatDateTable(invoice.issued_on)}</td>
                                            <td>{invoice.car_brand} {invoice.car_model}</td>
                                            <td>{Math.ceil(invoice.total_amount)} Kč</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            <NoData />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


        </>
    );

}

export default Dashboard;
