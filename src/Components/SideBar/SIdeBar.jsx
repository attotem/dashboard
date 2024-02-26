import { useState } from "react";
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
const Item = ({ title, to, icon, selected, setSelected, newColor }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let itemColor = selected === title ? colors.blueAccent[100] : colors.secondary;

    if (newColor && newColor !== "") {
        itemColor = newColor;
    }

    return (
        <div className={selected === title ? "selected" : ""}>
            <MenuItem
                active={selected === title}
                style={{ color: itemColor }}
                onClick={() => setSelected(title)}
                icon={icon}>

                <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>{title}</Typography>
                </Link>
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
                    {/* <Box
                        sx={{
                            paddingLeft: collapsed ? undefined : "10%",
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            textAlign: "center",
                            "& img": {
                                width: "50%",
                            },
                        }}
                    >
                        <img src={logo} alt="Logo" />
                    </Box> */}

                    <Box
                    >
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

                        <SubMenu
                            icon={<WarehouseIcon />}
                            label="Parks">


                            < Item
                                title="All parks"
                                to="/parks"
                                selected={selected}
                                setSelected={setSelected}
                            />

                            < Item
                                title="Create park"
                                to="/add_park"
                                selected={selected}
                                setSelected={setSelected}
                            />

                        </SubMenu>



                        <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarMonthRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenu
                            icon={<PeopleRoundedIcon />}
                            label="Drivers">


                            < Item
                                title="All drivers"
                                to="/drivers"
                                selected={selected}
                                setSelected={setSelected}
                            />

                            < Item
                                title="Create driver"
                                to="/driver_create"
                                selected={selected}
                                setSelected={setSelected}
                            />



                        </SubMenu>


                        {/* <SubMenu
                            icon={<AccountCircleIcon />}
                            label="Users">

                            < Item
                                title="All users"
                                to="/users"
                                selected={selected}
                                setSelected={setSelected}
                            />
                            < Item
                                title="Add user"
                                to="/add_user"
                                selected={selected}
                                setSelected={setSelected}
                            />

                        </SubMenu> */}

                        <Item
                            title="Payments"
                            to="/payments"
                            icon={<PaymentIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>

                    <Box paddingLeft={collapsed ? undefined : "10%"}
                        position={"absolute"}
                        bottom={0}

                    >
                        <Item
                            title="Log out"
                            to="/login"
                            icon={<LogoutIcon />}
                            setSelected={setSelected}
                            newColor="red"
                        />


                    </Box>

                </Menu>



            </Sidebar>
        </Box>
    );
};

export default MyProSidebar;
