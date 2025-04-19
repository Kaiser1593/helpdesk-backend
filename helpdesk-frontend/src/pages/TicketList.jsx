import { useEffect, useState } from 'react';
import { getTickets, deleteTicket } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '/src/style.css';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await getTickets();
            setTickets(data);
        };
        fetchTickets();
    }, []);

    const handleDelete = async (id) => {
        await deleteTicket(id);
        setTickets(tickets.filter(ticket => ticket.id !== id));
    };

    return (
        <div className="container">
            <h1>Liste des Tickets</h1>
            <button className="button" onClick={() => navigate('/create')}>
                + Créer un Ticket
            </button>
            {tickets.length === 0 ? (
                <p>Aucun ticket trouvé.</p>
            ) : (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.id} className="ticket">
                            <h2>{ticket.title}</h2>
                            <p>{ticket.description}</p>
                            <p>Priorité : {ticket.priority}</p>
                            <button onClick={() => navigate(`/edit/${ticket.id}`)}>Modifier</button>
                            <button className="button" onClick={() => handleDelete(ticket.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TicketList;