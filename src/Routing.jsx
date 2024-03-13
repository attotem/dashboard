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
import EditCar from "./Components/Cars/Edit_car";
import EditPark from "./Components/Parks/EditPark";
import EditDriver from "./Components/Drivers/EditDriver";
import EditUser from "./Components/Users/EditUser";
import ImageDropComponent from "./ImageDropComponent";
import { useAuth } from "./AuthProvider";
import ParksAdmin from "./Components/Parks/Admin/ParksAdmin";
import EditServiceInterval from "./Components/Cars/EditInfo";
import PaymentsHistory from "./Components/Payments/PaymentsHistory";
import Calendar from "./Components/Payments/Calendar";
import ImageUpload from "./Components/Parks/Image";

const Routing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<CustomFormValidation />} />

      <Route path="/dashboard" element={isAuthenticated ? <DefaultLayout><Dashboard /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/cars" element={isAuthenticated ? <DefaultLayout><Cars /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/edit_car/:carId" element={isAuthenticated ? <DefaultLayout><EditCar /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/edit_park/:paekId" element={isAuthenticated ? <DefaultLayout><EditPark /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/edit_driver/:driverId" element={isAuthenticated ? <DefaultLayout><EditDriver /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/edit_user/:userId" element={isAuthenticated ? <DefaultLayout><EditUser /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/edit_info/:carId" element={isAuthenticated ? <DefaultLayout><EditServiceInterval /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/drivers" element={isAuthenticated ? <DefaultLayout><Drivers /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/users" element={isAuthenticated ? <DefaultLayout><AllUsers /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/add_user" element={isAuthenticated ? <DefaultLayout><AddUser /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/add_car" element={isAuthenticated ? <DefaultLayout><AddCar /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/add_park" element={isAuthenticated ? <DefaultLayout><AddPark /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/payments_history" element={isAuthenticated ? <DefaultLayout><PaymentsHistory /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/calendar" element={isAuthenticated ? <DefaultLayout><Calendar /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/driver_create" element={isAuthenticated ? <DefaultLayout><AddDriver /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/parks" element={isAuthenticated ? <DefaultLayout><Parks /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="/image" element={isAuthenticated ? <DefaultLayout><ImageUpload /></DefaultLayout> : <Navigate to="/login" />} />


      <Route path="/choose_driver_park" element={isAuthenticated ? <DefaultLayout><ParksAdmin /></DefaultLayout> : <Navigate to="/login" />} />

      <Route path="*" element={isAuthenticated ? <DefaultLayout>No directory</DefaultLayout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default Routing;
