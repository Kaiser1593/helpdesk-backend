import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../services/api';
import './CreateTicket.css';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Faible');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket({ title, description, priority }); // pas de statut ici
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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateTicket;
