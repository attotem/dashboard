import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./Components/SideBar/DefaultLayout";
import Dashboard from "./Components/DashBoard/Dashboard";
import Cars from "./Components/Cars/Cars";
import Drivers from "./Components/Drivers/Drivers";
import Parks from "./Components/Parks/Parks";
import Create_driver from "./Components/Drivers/create_driver";
const Routing = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />

      <Route path="/cars" element={<DefaultLayout><Cars /></DefaultLayout>} />

      <Route path="/drivers" element={<DefaultLayout><Drivers /></DefaultLayout>} />

      <Route path="/driver_create" element={<DefaultLayout><Create_driver /></DefaultLayout>} />

      <Route path="/parks" element={<DefaultLayout><Parks /></DefaultLayout>} />

      <Route path="*" element={<DefaultLayout><div>No such directory</div></DefaultLayout>} />
    </Routes>
  );
};



export default Routing;
