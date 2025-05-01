import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../services/api';
import './CreateTicket.css';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Faible');
  const [status, setStatus] = useState('open'); // valeur par défaut
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Ticket à créer :", { title, description, priority, status });
      await createTicket({ title, description, priority, status });
      navigate('/tickets');
    } catch (err) {
      console.error('Erreur création ticket:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Créer un ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="open">Ouvert</option>
          <option value="in_progress">En cours</option>
          <option value="closed">Fermé</option>
        </select>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateTicket;
