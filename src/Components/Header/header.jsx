import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import avatar from "./avatar.jpg";

function Header({ text }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef(null); // Ref for the notification menu

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    // Add when the notification menu is open
    if (isNotificationsOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      // Clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  return (
    <div className="container-fluid pb-3">
      <div className="row align-items-center">
        <div className="col">
          <h1>{text}</h1>
        </div>

        <div className="col-auto">
          <div className="btn-group" ref={notificationRef}>
            <button type="button" className="btn" onClick={toggleNotifications}>
              <span className="notification-icon"><NotificationsNoneIcon /></span>
            </button>
            {isNotificationsOpen && (
              <div className="notification-menu">
                <ul>
                  <li><a href="#">
                    <div className='notification_container'>
                      <div>Car: SomeCar</div>
                      <div>Issuse: SomeIssue</div>
                    </div>

                  </a></li>
                  <li><a href="#">
                    <div className='notification_container'>
                      <div>Car: SomeCar</div>
                      <div>Issuse: SomeIssue</div>
                    </div></a></li>
                  <li><hr /></li>
                  <li><a href="#">
                    <div className='notification_container'>
                      <div>Car: SomeCar</div>
                      <div>Issuse: SomeIssue</div>
                    </div>
                  </a></li>
                </ul>
              </div>
            )}
          </div>

          <div className="btn-group">
            <Avatar alt="Name Surname" src={avatar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
