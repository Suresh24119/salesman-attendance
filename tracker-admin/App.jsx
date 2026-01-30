import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './screens/Register';
import Login from './screens/Login';
import Permissions from './screens/Permissions';
import Map from './screens/Map';
import Timeline from './screens/Timeline';

function App() {
  return (
    <Router>
      <div className="max-w-[450px] mx-auto bg-white min-h-screen shadow-2xl relative overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/map" element={<Map />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
