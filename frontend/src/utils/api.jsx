import axios from 'axios';

// http://localhost:3000/api/v1/tasks

const API_URL = 'http://localhost:3000/api/v1/tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.data.tasks;
};

export const getTask = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data.task;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data.data.task;
};

export const updateTask = async ({ id, task }) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data.data.task;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
