import { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "./Theme";
import { useTheme, Box, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PaymentIcon from '@mui/icons-material/Payment';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import logo from "./logo.png"
import { useNavigate } from "react-router-dom";
import { useSelectedPark } from "../../SelectedParkContext";
import { Remove } from "@mui/icons-material";
import { useCookies } from 'react-cookie'

const Item = ({ title, to, icon, selected, setSelected, newColor, onclick }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let itemColor = selected === title ? colors.selected : colors.secondary;

    if (newColor && newColor !== "") {
        itemColor = newColor;
    }

    const handleItemClick = () => {
        setSelected(title);
        navigate(to);
    };


    return (
        <div className={selected === title ? "selected" : ""} onClick={onclick}>
            <MenuItem
                active={selected === title}
                style={{ color: itemColor }}
                onClick={handleItemClick}
                icon={icon}>

                <Typography>{title}</Typography>

            </MenuItem>
        </div>
    );
};


const MyProSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("");
    const { sidebarRTL, sidebarImage } = useSidebarContext();
    const { collapsed } = useProSidebar();
    const storedIsSuperuser = localStorage.getItem('isSuperuser');
    const [selectedPark, setSelectedPark] = useState('');

    const [parks, setParks] = useState([]);
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];
    const { setSelectedParkId } = useSelectedPark();


    console.log(sessionId)

    useEffect(() => {
        fetch("https://ttestt.shop/cars/api/getAll_parks", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${sessionId}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setParks(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [sessionId]);
    const navigate = useNavigate();

    const handleParkSelect = (id) => {
        fetch("https://ttestt.shop/cars/api/update_session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionId}`
            },
            cache: "no-cache",
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };
    const handleParkChange = (event) => {
        const parkId = event.target.value;
        setSelectedPark(parkId);
        handleParkSelect(parkId);
        setSelectedParkId(parkId);
    };
    function deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    function RemoveSession() {



        deleteCookie('session_id');
        fetch(`https://ttestt.shop/cars/api/remove_session`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionId}`,
            }
        })
            .then(response => {

            })
            .then(data => {
            })
            .catch(error => {

            });
        navigate("/login")
    }


    return (
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                top: 100,
                bottom: 0,
                zIndex: 10000,
                "& .sidebar": {
                    border: "none",
                },
                "& .menu-icon": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-item": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-anchor": {
                    color: "inherit !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-item:hover": {
                    color: `${colors.blueAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .menu-item.active": {
                    color: `${colors.greenAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                '& .MuiTypography-root': {
                    fontSize: '1.2rem',
                },
                '& svg': {
                    fontSize: '1.2rem',
                },
            }}
        >
            <Sidebar
                breakPoint="md"
                rtl={sidebarRTL}
                backgroundColor={colors.white}
                image={sidebarImage}
            >

                <Menu iconshape="square">
                    <Box
                        sx={{
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            textAlign: "center",
                            "& img": {
                                width: "100%",
                            },
                        }}
                    >
                        <img src={logo} alt="Logo" />
                    </Box>

                    <Box
                    >

                        {storedIsSuperuser === '1' && (
                            <Box sx={{ padding: theme.spacing(2) }}>
                                <select
                                    value={selectedPark}
                                    onChange={handleParkChange}
                                    style={{ width: '100%', padding: '10px', marginBottom: '1rem', zIndex: "10000" }}
                                >
                                    <option value="" disabled >Select a park</option>
                                    {parks.map((park) => (
                                        <option key={park.id} value={park.id}>
                                            {park.name}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                        )}

                        <Item
                            title="Dashboard"
                            to="/dashboard"
                            icon={<HomeRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected} s
                        />

                        < Item
                            title="Cars"
                            to="/cars"
                            selected={selected}
                            setSelected={setSelected}
                            icon={<DirectionsCarFilledRoundedIcon />}

                        />

                        {storedIsSuperuser == 1 ? <>
                            < Item
                                title="Parks"
                                icon={<WarehouseIcon />}
                                to="/parks"
                                selected={selected}
                                setSelected={setSelected}
                            />


                        </> : <></>}

                        < Item
                            icon={<PeopleRoundedIcon />}
                            title="Drivers"
                            to="/drivers"
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenu
                            icon={<PaymentIcon />}
                            label="Payments">

                            < Item
                                title="History"
                                to="/payments_history"
                                selected={selected}
                                setSelected={setSelected}
                            />

                        </SubMenu>

                        <SubMenu
                            icon={<CalendarMonthRoundedIcon />}
                            label="Calendar">

                            < Item
                                title="Upcoming"
                                to="/payments"
                                selected={selected}
                                setSelected={setSelected}
                            />

                        </SubMenu>

                    </Box>



                    <div onclick={RemoveSession}>

                        <Box paddingLeft={collapsed ? undefined : "10%"}
                            position={"absolute"}
                            bottom={0}

                        >
                            <Item
                                title="Log out"
                                icon={<LogoutIcon />}
                                setSelected={setSelected}
                                newColor="red"
                                onclick={RemoveSession}
                            />



                        </Box>
                    </div>

                </Menu>



            </Sidebar>
        </Box>
    );
};

export default MyProSidebar;
