import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../services/auth';

const Urgence = () => {
  const [urgentTickets, setUrgentTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin/login');
    }
    fetchUrgence();
  }, []);

  const fetchUrgence = async () => {
    const res = await axios.get('http://localhost:5000/api/tickets/urgence');
    setUrgentTickets(res.data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ flex: 1 }}>
        <h1>Urgence - 10 tickets les plus anciens</h1>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            {urgentTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Urgence;
