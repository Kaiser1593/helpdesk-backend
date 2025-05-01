import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets, deleteTicket } from '../services/api';
import { isAdmin } from '../services/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '/src/style.css';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin/login');
    }
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data);
      setFilteredTickets(data);
    };
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    await deleteTicket(id);
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    applyFilter(filter, updated);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    applyFilter(value, tickets);
  };

  const applyFilter = (status, list) => {
    if (status === 'all') {
      setFilteredTickets(list);
    } else {
      setFilteredTickets(list.filter(ticket => ticket.status === status));
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'open': return 'Ouvert';
      case 'in_progress': return 'En cours';
      case 'closed': return 'Fermé';
      default: return status || '—';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div className="container" style={{ flex: 1 }}>
        <h1>Tableau de bord - Admin</h1>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filtrer par statut :</label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">Tous</option>
            <option value="open">Ouvert</option>
            <option value="in_progress">En cours</option>
            <option value="closed">Fermé</option>
          </select>
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
            {filteredTickets.length === 0 ? (
              <tr><td colSpan="5">Aucun ticket trouvé.</td></tr>
            ) : (
              filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priority}</td>
                  <td>{formatStatus(ticket.status)}</td>
                  <td>
                    <button className="ticket-button" onClick={() => navigate(`/admin/edit/${ticket.id}`)}>Modifier</button>
                    <button className="ticket-button" onClick={() => handleDelete(ticket.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
