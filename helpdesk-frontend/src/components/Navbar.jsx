import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Pour les styles de la navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>HelpDesk</h1>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/tickets">Liste des Tickets</Link></li>
                <li><Link to="/create">Créer un Ticket</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
