import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Bills from './pages/Bills';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/bills" element={<Bills />} />
    </Routes>
  );
}

export default App;