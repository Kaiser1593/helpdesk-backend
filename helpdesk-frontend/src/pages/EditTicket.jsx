import { useEffect, useState } from 'react';
import { getTicketById, updateTicket } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import '/src/style.css';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id);
        setTicket(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du ticket :", error);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticket.title || !ticket.description || !ticket.priority) {
      alert("Tous les champs sont requis.");
      return;
    }

    try {
      await updateTicket(ticket.id, {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority
        // ❌ pas de statut modifié ici
      });
      navigate('/tickets');
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!ticket) return <p>Ticket introuvable</p>;

  return (
    <div className="form-container">
      <h2>Modifier le ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={ticket.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
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
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditTicket;
