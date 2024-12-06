import { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { tokens } from "./Theme";
import { useTheme, Box, Typography } from "@mui/material";
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
import { API_BASE_URL } from '../url';
import { getAllParks,updateSession } from "../../http";


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

    const translations = {
        "Dashboard": "Přístrojová deska",
        "Cars": "Auta",
        "Parks": "Parky",
        "Drivers": "Řidiči",
        "Payments": "Platby",
        "Calendar": "Kalendář",
        "Log out": "Odhlásit se",
        "Select a park": "Vyberte park",
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
    const storedIsSuperuser = JSON.parse(localStorage.getItem('isSuperuser'));

    const [selectedPark, setSelectedPark] = useState('');

    const [parks, setParks] = useState([]);
    const cookie = document.cookie;
    let sessionId = cookie.split("=")[1];
    const { setSelectedParkId } = useSelectedPark();

    const fetchAllParks = async () => {
        try {
            const data = await getAllParks();
            setParks(data);
                } catch (error) {
            console.error('Error fetching serviced data:', error);
        }
    };

    useEffect(() => {
        fetchAllParks()
    }, [sessionId]);
    const navigate = useNavigate();

    const handleParkSelect = async (id) => {
       await updateSession(JSON.stringify({ id }))
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
        fetch(`${API_BASE_URL}api/parks/sessions/remove`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionId}`,
                "ngrok-skip-browser-warning": "69420",

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
                        <img src="https://petpunch.xyz/media/drivelab2.png" alt="Logo" />
                    </Box>

                    <Box
                    >

                        {storedIsSuperuser && (
                            <Box sx={{ padding: theme.spacing(2) }}>
                                <select
                                    value={selectedPark}
                                    onChange={handleParkChange}
                                    style={{ width: '100%', padding: '10px', marginBottom: '1rem', zIndex: "10000" }}
                                >
                                    <option value="" disabled >Výběr parku</option>
                                    {parks.map((park) => (
                                        <option key={park.id} value={park.id}>
                                            {park.name}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                        )}

                        <Item
                            title="Přístrojová deska"
                            to="/dashboard"
                            icon={<HomeRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected} s
                        />

                        < Item
                            title="Automobily"
                            to="/cars"
                            selected={selected}
                            setSelected={setSelected}
                            icon={<DirectionsCarFilledRoundedIcon />}

                        />

                        {storedIsSuperuser ? <>
                            < Item
                                title="Parky"
                                icon={<WarehouseIcon />}
                                to="/parks"
                                selected={selected}
                                setSelected={setSelected}
                            />


                        </> : <></>}

                        < Item
                            icon={<PeopleRoundedIcon />}
                            title="Řidiči"
                            to="/drivers"
                            selected={selected}
                            setSelected={setSelected}
                        />


                        < Item
                            title="Platby"
                            icon={<PaymentIcon />}
                            to="/payments_history"
                            selected={selected}
                            setSelected={setSelected}
                        />


                        < Item
                            icon={<CalendarMonthRoundedIcon />}
                            title="Kalendář"
                            to="/calendar"
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </Box>



                    <div onClick={RemoveSession}>

                        <Box paddingLeft={collapsed ? undefined : "10%"}
                            position={"absolute"}
                            bottom={0}

                        >
                            <Item
                                title="Odhlášení"
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
