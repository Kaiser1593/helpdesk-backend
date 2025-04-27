import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // adapte si besoin

export const getTickets = async () => {
    const response = await axios.get(`${BASE_URL}/tickets`);
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await axios.get(`${BASE_URL}/tickets/${id}`);
    return response.data;
};

export const createTicket = async (ticket) => {
    const response = await axios.post(`${BASE_URL}/tickets`, ticket);
    return response.data;
};

export const updateTicket = async (id, updatedTicket) => {
    const response = await axios.put(`http://localhost:5000/api/tickets/${id}`, updatedTicket);
    return response.data;
};

export const deleteTicket = async (id) => {
    const response = await axios.delete(`${BASE_URL}/tickets/${id}`);
    return response.data;
};
