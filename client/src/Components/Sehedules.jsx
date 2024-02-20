import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom';
import './Connection.css';

const Schedules = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='bg-login'>
        <div className="dashboard">
            <div className="sidebar">
                <h2 onClick={() => handleNavigation('/home')}>Schedules</h2>
                <ul>
                    <li onClick={() => handleNavigation('/home')}>Home</li>
                    <li onClick={() => handleNavigation('/connection')}>Connection  <SettingsInputHdmiIcon /></li>
                    <li onClick={() => handleNavigation('/CreateConnection')}>Create Connection</li>
                    <li onClick={() => handleNavigation('/Pipeline')}>Pipeline <QueryStatsIcon /></li>
                    <li onClick={() => handleNavigation('/Config')}>Configuration <i className="fa-solid fa-database"></i></li>
                    <li onClick={() => handleNavigation('/Schedules')}>Schedules <AccessTimeIcon /></li>
                    <li onClick={() => handleNavigation('/home')}>Settings</li>
                </ul>
            </div>

            <div className="schedules-container">
                <h2>Schedules</h2>
                <div className="schedule-item">
                    <AccessTimeIcon />
                    <span className="schedule-description">Scheduled task 1</span>
                </div>
                <div className="schedule-item">
                    <AccessTimeIcon />
                    <span className="schedule-description">Scheduled task 2</span>
                </div>
                <div className="schedule-item">
                    <AccessTimeIcon />
                    <span className="schedule-description">Scheduled task 3</span>
                </div>
                {/* Add more scheduled tasks as needed */}
            </div>
        </div>
        </div>
    );
}

export default Schedules;
