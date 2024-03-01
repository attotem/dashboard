import React from 'react'
import Linechart from "./linechart"
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
import "./dashboard.css"
function Dashboard() {



    return (
        <>
            <dashboard className="ml-5">
                <div className='d-flex'>
                    <div className='chart_wrapper'>
                        <SimpleBarChart />

                    </div>

                    <div className='chart_wrapper'>
                        <CustomActiveShapePieChart />

                    </div>

                    <div className='chart_wrapper'>
                        <TinyAreaChart />
                    </div>
                </div>


            </dashboard >
        </>

    )
}

export default Dashboard