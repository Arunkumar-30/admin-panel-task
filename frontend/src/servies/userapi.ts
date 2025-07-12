import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = (data: any) => API.post('/register', data);

export const login = (data: any) => API.post('/login', data);

export const getUsers = (token: string) =>
  API.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Fixed here
    },
  });

export const deleteUser = (id: number, token: string) =>
  API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Fixed here
    },
  });
