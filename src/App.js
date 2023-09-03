import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Routes, and Route
import Navbar from './Components/Navbar'; // Import your Navbar component
import Home from './Components/Capsules'; // Import your Home component
import Login from './Components/Login'; // Import your Login component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render the Navbar component */}
        
        <Routes> {/* Wrap your routes in a <Routes> element */}
          <Route path="/" element={<Home />} /> {/* Define a route for Home */}
          <Route path="/login" element={<Login />} /> {/* Define a route for Login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
