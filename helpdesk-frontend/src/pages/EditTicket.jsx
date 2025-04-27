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
        setTicket(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTicket(ticket.id, ticket); // Utilise ticket.id et pas ticket._id !
            navigate('/tickets');
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };
    

    if (loading) return <p>Chargement...</p>;
    if (!ticket) return <p>Ticket introuvable</p>;

    return (
        <div className="container">
            <h1>Modifier le Ticket</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>Titre :</label>
                <input type="text" name="title" value={ticket.title} onChange={handleChange} required />

                <label>Description :</label>
                <textarea name="description" value={ticket.description} onChange={handleChange} required />

                <label>Priorité :</label>
                <select name="priority" value={ticket.priority} onChange={handleChange} required>
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                </select>

                <label>Statut :</label>
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


                <button className="button" type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default EditTicket;
