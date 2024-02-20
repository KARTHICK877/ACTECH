import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Connection.css';

function Connection() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ username: '', email: '' }); // New state for form filling
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
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:9000/api/user', newUser);
            console.log('User added successfully');
            getUsers();
            setNewUser({ username: '', email: '' }); // Reset form fields
            toast.success('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Error adding user');
        }
    };

    const filteredUsers = users.filter((user) => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='bg-login'>
            <div className="dashboard">
                <div className="sidebar">
                    <h2 onClick={() => handleNavigation('/home')}>Dashboard</h2>
                    <ul>
                        <li onClick={() => handleNavigation('/home')}>Home</li>
                        <li onClick={() => handleNavigation('/connection')}>Connection  <SettingsInputHdmiIcon /></li>
                        <li onClick={() => handleNavigation('/CreateConnection')}>Create Connection</li>
                        <li onClick={() => handleNavigation('/pipeline')}>Pipeline <QueryStatsIcon /></li>
                        <li onClick={() => handleNavigation('/Config')}>Configuration <i className="fa-solid fa-database"></i></li>
                        <li onClick={() => handleNavigation('/Schedules')}>Schedules <AccessTimeIcon /></li>
                        <li onClick={() => handleNavigation('/home')}>Settings</li>
                    </ul>
                </div>
                <div className="content">
                    <h2 style={{ color: "white" }}>Configuration</h2>
                    <div>
                        
                        
                        <h3>User Summary</h3>
                        <ul>
                            {filteredUsers.map((user) => (
                                <li key={user._id}>
                                    Username: {user.username}, Email: {user.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Connection;
