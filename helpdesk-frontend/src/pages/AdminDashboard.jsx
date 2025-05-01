import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets, deleteTicket } from '../services/api';
import { isAdmin } from '../services/auth';
import '/src/style.css';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin/login');
    }
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    await deleteTicket(id);
    setTickets(prev => prev.filter(t => t.id !== id));
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
    <div className="container">
      <h1>Tableau de bord - Admin</h1>
      <button className="button" onClick={() => navigate('/admin/logout')}>Déconnexion</button>
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
              <td>{formatStatus(ticket.status)}</td>
              <td>
                <button className="ticket-button" onClick={() => navigate(`/admin/edit/${ticket.id}`)}>Modifier</button>
                <button className="ticket-button" onClick={() => handleDelete(ticket.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
