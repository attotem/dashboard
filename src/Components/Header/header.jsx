import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import avatar from "./avatar.jpg";

function Header() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef(null); // Ref for the notification menu

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  return (
    <div className="container-fluid pb-3 d-flex justify-content-end">

      <div className='appoinment_button'> <a href='https://rezervace.drivelab.cz' target="_blank">Make an appointment</a> </div>

    </div >
  );
}

export default Header;
