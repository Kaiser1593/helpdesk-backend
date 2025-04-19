// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TicketList from './pages/TicketList';
import CreateTicket from './pages/CreateTicket';
import '/src/style.css'; // <-- corrigé ici !

import Navbar from './components/Navbar'; // ajuste le chemin si nécessaire

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tickets" element={<TicketList />} />
                <Route path="/create" element={<CreateTicket />} />
            </Routes>
        </Router>
    );
};


ReactDOM.createRoot(document.getElementById('root')).render(<App />);
