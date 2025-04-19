import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTicket, getTickets } from '../services/api';
import './CreateTicket.css'; // On peut réutiliser le CSS

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const tickets = await getTickets();
      const found = tickets.find((t) => t.id == id);
      setTicket(found);
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTicket(id, ticket);
    navigate('/tickets');
  };

  if (!ticket) return <div>Chargement...</div>;

  return (
    <div className="form-container">
      <h2>Modifier le ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
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
        <select name="priority" value={ticket.priority} onChange={handleChange}>
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>
        <select name="status" value={ticket.status} onChange={handleChange}>
          <option value="Ouvert">Ouvert</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditTicket;
