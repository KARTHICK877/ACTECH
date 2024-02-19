import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import Register from "./Components/Register";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Connection from "./Components/Connection";
import CreateConnection from "./Components/CreateConnection"
import UnderWork from "./Components/UnderWork";
import Welcome from "./Components/Welcome"; 
function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/welcome" element={<Welcome />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/CreateConnection" element={<CreateConnection />} />
        <Route path="/UnderWork" element={<UnderWork />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
