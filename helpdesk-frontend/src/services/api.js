import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // 🔥 adapte si ton port change

export const getTickets = async () => {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await axios.get(`${API_URL}/tickets/${id}`);
    return response.data;
};

export const createTicket = async (ticket) => {
    const response = await axios.post(`${API_URL}/tickets`, ticket);
    return response.data;
};

export const updateTicket = async (id, ticket) => {
    const response = await axios.put(`${API_URL}/tickets/${id}`, ticket);
    return response.data;
};

export const deleteTicket = async (id) => {
    const response = await axios.delete(`${API_URL}/tickets/${id}`);
    return response.data;
};
