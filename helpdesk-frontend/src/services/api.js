// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Assurez-vous que c'est bien l'URL de votre backend

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTickets = async () => {
    const response = await api.get('/tickets');
    return response.data;
};

export const createTicket = async (ticketData) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
};

export const updateTicket = async (id, ticketData) => {
    const response = await api.put(`/tickets/${id}`, ticketData);
    return response.data;
};

export const deleteTicket = async (id) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
};
