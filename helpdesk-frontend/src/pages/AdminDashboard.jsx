import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets, deleteTicket } from '../services/api';
import { isAdmin } from '../services/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '/src/style.css';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, resolved_3months: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin/login');
    }
    fetchTickets();
    fetchStats();
  }, []);

  const fetchTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  const fetchStats = async () => {
    const res = await axios.get('http://localhost:5000/api/tickets/stats/global');
    setStats(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    await deleteTicket(id);
    fetchTickets();
    fetchStats();
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Archiver ce ticket ?")) return;
    await axios.put(`http://localhost:5000/api/tickets/archive/${id}`);
    fetchTickets();
    fetchStats();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ flex: 1 }}>
        <h1>Tableau de bord - Admin</h1>

        <div className="stats">
          <p>🎫 Tickets total : {stats.total}</p>
          <p>✅ Résolus : {stats.resolved}</p>
          <p>📅 Résolus depuis plus de 3 mois : {stats.resolved_3months}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button className="button" onClick={() => navigate('/admin/archive')}>Voir les archives</button>
          <button className="button" onClick={() => navigate('/admin/urgence')}>Urgence (Top 10 anciens)</button>
        </div>

        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>
                  <button onClick={() => navigate(`/admin/edit/${ticket.id}`)}>Modifier</button>
                  <button onClick={() => handleDelete(ticket.id)}>Supprimer</button>
                  <button onClick={() => handleArchive(ticket.id)}>Archiver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
