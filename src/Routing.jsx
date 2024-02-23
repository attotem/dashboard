import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./Components/SideBar/DefaultLayout";
import Dashboard from "./Components/DashBoard/Dashboard";
import Cars from "./Components/Cars/Cars";
import Drivers from "./Components/Drivers/Drivers";
import Parks from "./Components/Parks/Parks";
import AddDriver from "./Components/Drivers/create_driver";
import AddUser from "./Components/Users/AddUser";
import AddCar from "./Components/Cars/AddCar";
import AddPark from "./Components/Parks/Create_park";
import AllUsers from "./Components/Users/AllUsers";
import CustomFormValidation from "./Components/Login/login"

const Routing = () => {
  return (
    <Routes>

      

      <Route path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />

      <Route path="/cars" element={<DefaultLayout><Cars /></DefaultLayout>} />

      <Route path="/login" element={<CustomFormValidation />} />

      <Route path="/drivers" element={<DefaultLayout><Drivers /></DefaultLayout>} />

      <Route path="/users" element={<DefaultLayout><AllUsers /></DefaultLayout>} />

      <Route path="/add_user" element={<DefaultLayout><AddUser /></DefaultLayout>} />

      <Route path="/add_car" element={<DefaultLayout><AddCar /></DefaultLayout>} />

      <Route path="/add_park" element={<DefaultLayout><AddPark /></DefaultLayout>} />

      <Route path="/driver_create" element={<DefaultLayout><AddDriver /></DefaultLayout>} />

      <Route path="/parks" element={<DefaultLayout><Parks /></DefaultLayout>} />

      <Route path="*" element={<DefaultLayout><div>No such directory</div></DefaultLayout>} />
    </Routes>
  );
};



export default Routing;
