import React from 'react';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import avatar from "./avatar.jpg";

function Header({ text }) {
  return (
    <div className="container-fluid pb-3">
      <div className="row align-items-center">
        <div className="col">
          <h1>{text}</h1>
        </div>

        <div className="col-auto">
          <div className="btn-group">
            <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="notification-icon"><NotificationsNoneIcon /></span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Notification 1</a></li>
              <li><a className="dropdown-item" href="#">Notification 2</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">All Notifications</a></li>
            </ul>
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
