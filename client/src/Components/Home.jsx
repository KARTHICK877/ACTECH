import React, { useState, useEffect } from 'react';
import './Home.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
export default function Home() {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];
const data = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
  { label: 'Group E', value: 278 },
  { label: 'Group F', value: 189 },
];
const [progress, setProgress] = React.useState(0);

React.useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  }, 800);

  return () => {
    clearInterval(timer);
  };
}, []);
  const navigate = useNavigate();
  const [userDataCount, setUserDataCount] = useState(0);

  useEffect(() => {
    // Fetch user data count when component mounts
    fetchUserDataCount();
  }, []);

  const fetchUserDataCount = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/user');
      if (response.ok) {
        const users = await response.json();
        setUserDataCount(users.length); // Set user data count
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='bg-login'>
      <div className="dashboard">
        <div className="sidebar">
          <h2>Dashboard</h2>
          <ul>
            <li onClick={() => handleNavigation('/home')}>Home</li>
            <li onClick={() => handleNavigation('/connection')}>Connection.. ({userDataCount}) <SettingsInputHdmiIcon /> </li> {/* Display user data count */}
            <li onClick={() => handleNavigation('/CreateConnection')}>Create Connection </li>
            <li onClick={() => handleNavigation('/Pipeline')}>Pipeline <QueryStatsIcon /></li>
            <li onClick={() => handleNavigation('/Config')}>Configuration <i className="fa-solid fa-database"></i></li>
            <li onClick={() => handleNavigation('/Schedules')}>Schedules <AccessTimeIcon /></li>
            <li onClick={() => handleNavigation('/home')}>Settings</li>
            <div onClick={()=>handleNavigation('/login')} className='logout'><LogoutIcon/>logout</div>
          </ul>
        </div>
  
    
      
       
        <div className="content">
          <h2 style={{ color: "white" }}>Dashboard</h2>
          <div className="boxes">
            <div className="box" style={{ backgroundColor: "lightblue" }}> <span className='span'> Connection <SettingsInputHdmiIcon />  <br /><span className='count'>total count : ({userDataCount})</span><span className='pro1'><CircularProgress variant="determinate" value={30} /></span> </span> </div>
            <div className="box" style={{ backgroundColor: "lightcoral" }}><span className='span'> Configuration     <i className="fa-solid fa-database"></i><span className='pro'><CircularProgress variant="determinate" value={progress} color="success"/></span></span></div>
            <div className="box" style={{ backgroundColor: "lightyellow" }}><span className='span'> Pipeline   <QueryStatsIcon /> <span className='pro'><CircularProgress variant="indeterminate" value={progress} /></span> </span></div>
            <div className="box" style={{ backgroundColor: "lightpink" }}><span className='span'> Schedules  <AccessTimeIcon /><span className='pro'><CircularProgress variant="determinate" value={75} color="secondary" /></span></span></div>
          </div>
          <div className="graph">
            {/* Graph component can be added here */}
            <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
      
    /> <BarChart
    width={500}
    height={400}
    series={[
      { data: pData, label: 'pv', id: 'pvId' },
      { data: uData, label: 'uv', id: 'uvId' },
    ]}
    xAxis={[{ data: xLabels, scaleType: 'band' }]}
  />

          </div>
        
        </div>
      </div>
    </div>
  );
}
