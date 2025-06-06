import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import TicketList from './pages/TicketList';
import CreateTicket from './pages/CreateTicket';
import EditTicket from './pages/EditTicket';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditTicket from './pages/AdminEditTicket';
import Archive from './pages/archive';
import Urgence from './pages/urgence';

import { isAdmin } from './services/auth';
import './style.css';

const LogoutRedirect = () => {
  localStorage.removeItem('isAdmin');
  return <Navigate to="/admin/login" replace />;
};

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/admin/login" replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Utilisateur */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tickets" element={<TicketList />} />
          <Route path="create" element={<CreateTicket />} />
          <Route path="edit/:id" element={<EditTicket />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/logout" element={<LogoutRedirect />} />
        
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/edit/:id" element={<AdminRoute><AdminEditTicket /></AdminRoute>} />
        <Route path="/admin/archive" element={<AdminRoute><Archive /></AdminRoute>} />
        <Route path="/admin/urgence" element={<AdminRoute><Urgence /></AdminRoute>} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
