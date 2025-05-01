import { useEffect, useState } from 'react';
import { getTickets, deleteTicket } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '/src/style.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tickets :", error);
      }
    };
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };

  return (
    <div className="container">
      <h1>Mes Tickets</h1>
      <button className="button" onClick={() => navigate('/create')}>
        + Créer un Ticket
      </button>
      {tickets.length === 0 ? (
        <p>Aucun ticket trouvé.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id} className="ticket">
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
              <p>Priorité : {ticket.priority}</p>
              {/* ❌ Aucune ligne Statut */}
              <button className="ticket-button" onClick={() => navigate(`/edit/${ticket.id}`)}>
                Modifier
              </button>
              <button className="ticket-button" onClick={() => handleDelete(ticket.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
