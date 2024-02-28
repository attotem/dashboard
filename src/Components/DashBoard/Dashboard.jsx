import React from 'react'
import Linechart from "./linechart"
import Card from "./Card"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Header from '../Header/header';

function Dashboard() {



    return (
        <>
            {/* <Header text={"Welcome back"} /> */}
            <dashboard className="ml-5">
                {/* <h3>Welcome back</h3> */}
                {/* <div className='d-flex justify-content-between info_container '>
                    <Card
                        icon={PeopleOutlineIcon}
                        title={'Total Users'}
                        total={'87,394'}
                        persents={"1.01"}

                    />
                    <Card
                        icon={WorkOutlineIcon}
                        title={'Total products '}
                        total={'23,283.5'}
                        persents={"0.49"}
                    />
                    <Card
                        icon={VerifiedIcon}
                        title={'Total Users'}
                        total={'46,827'}
                        persents={"0,91"}
                    />
                    <Card
                        icon={RotateRightIcon}
                        title={'Refunded'}
                        total={'87,394'}
                        persents={"1.51"}
                    />
                </div> */}

                <Linechart />

            </dashboard >
        </>

    )
}

export default Dashboard