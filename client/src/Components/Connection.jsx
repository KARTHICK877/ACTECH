import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom';

import './Connection.css';

function Connection() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/api/user/${id}`);
            console.log('User deleted successfully');
            getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className='bg-login'>
            <div className="dashboard">
                <div className="sidebar">
                    <h2 onClick={() => handleNavigation('/home')}>Dashboard</h2>
                    <ul>
                        <li onClick={() => handleNavigation('/home')}>Home</li>
                        <li onClick={() => handleNavigation('/connection')}>Connection  <SettingsInputHdmiIcon /></li>
                        <li onClick={() => handleNavigation('/CreateConnection')}>Create Connection</li>
                        <li onClick={() => handleNavigation('/underwork')}>Configuration <i className="fa-solid fa-database"></i></li>
                        <li onClick={() => handleNavigation('/underwork')}>Pipeline <QueryStatsIcon /></li>
                        <li onClick={() => handleNavigation('/underwork')}>Schedules <AccessTimeIcon /></li>
                        <li onClick={() => handleNavigation('/underwork')}>Settings</li>
                    </ul>
                </div>
                <div className="content">
                    <h2 style={{ color: "white" }}>Connection</h2>
                    <div>
                        <h3>User Data</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td> {/* Serial number */}
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{new Date().toLocaleDateString()}</td> {/* Current date */}
                                        <td>
                                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                                            {/* <button onClick={() => handleEditUser(user._id)}>Edit</button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connection;
