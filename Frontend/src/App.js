import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './Components/Navbar'; 
import Home from './Components/Capsules';
import Login from './Components/Login'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
