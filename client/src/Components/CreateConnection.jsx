import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateConnection.css';

function CreateConnection() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:9000/api/user/register', newUser);
            toast.success('User added successfully');
            getUsers();
            setNewUser({
                username: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('Failed to add user');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className='bg-login'>
            <ToastContainer />
            <div className="dashboard">
                <div className="sidebar">
                    <h2 onClick={() => handleNavigation('/home')}>Dashboard</h2>
                    <ul>
                        <li onClick={() => handleNavigation('/home')}>Home</li>
                        <li onClick={() => handleNavigation('/connection')}>Connection  <SettingsInputHdmiIcon /></li>
                        <li onClick={() => handleNavigation('/CreateConnection')}>Create Connection</li>
                        <li onClick={() => handleNavigation('/underwork')}>Configuration <i class="fa-solid fa-database"></i></li>
                        <li onClick={() => handleNavigation('/underwork')}>Pipeline <QueryStatsIcon /></li>
                        <li onClick={() => handleNavigation('/underwork')}>Schedules <AccessTimeIcon /></li>
                        <li onClick={() => handleNavigation('/underwork')}>Settings</li>
                    </ul>
                </div>
                <div>
                    <h2 style={{ margin: "15px", color: "white" }}>Add User</h2>
                    <form className='form' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility based on state
                                name="password"
                                value={newUser.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <i
                                onClick={togglePasswordVisibility}
                                className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"} eyeIcon`} // Change icon based on password visibility state
                            ></i>
                        </div>
                        <button type="submit">Add User</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateConnection;
