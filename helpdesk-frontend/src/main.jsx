// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TicketList from './pages/TicketList';
import CreateTicket from './pages/CreateTicket';
import EditTicket from './pages/EditTicket'; // ✅ nouvelle page d'édition
import Navbar from './components/Navbar';     // ✅ ta barre de navigation

import './style.css'; // ✅ style CSS global

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tickets" element={<TicketList />} />
                <Route path="/create" element={<CreateTicket />} />
                <Route path="/edit/:id" element={<EditTicket />} /> {/* ✅ nouvelle route */}
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
