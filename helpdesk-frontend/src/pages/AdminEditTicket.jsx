import { useEffect, useState } from 'react';
import { getTicketById, updateTicket } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { isAdmin } from '../services/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminEditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin/login');
    }

    const fetchTicket = async () => {
      const data = await getTicketById(id);
      setTicket(data);
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTicket(ticket.id, ticket);
    navigate('/admin');
  };

  if (!ticket) return <p>Chargement...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div className="form-container" style={{ flex: 1 }}>
        <h2>Modifier le ticket (Admin)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            required
          />
          <select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            required
          >
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
          <select
            name="status"
            value={ticket.status}
            onChange={handleChange}
            required
          >
            <option value="open">Ouvert</option>
            <option value="in_progress">En cours</option>
            <option value="closed">Fermé</option>
          </select>
          <button type="submit">Enregistrer</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AdminEditTicket;
