import axios from "axios";

const API_URL = "http://localhost:3000";

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const addTask = (task) => axios.post(`${API_URL}/task`, task);
export const updateTask = (id, updated) =>
  axios.patch(`${API_URL}/tasks/${id}`, updated);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
