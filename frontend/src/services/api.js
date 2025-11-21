import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar autenticação
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

// Alunos
export const getAlunos = () => api.get('/alunos');
export const getAluno = (id) => api.get(`/alunos/${id}`);
export const createAluno = (aluno) => api.post('/alunos', aluno);
export const updateAluno = (id, aluno) => api.put(`/alunos/${id}`, aluno);
export const deleteAluno = (id) => api.delete(`/alunos/${id}`);
export const matricularAluno = (alunoId, cursoId) => 
  api.post(`/alunos/${alunoId}/cursos/${cursoId}`);
export const desmatricularAluno = (alunoId, cursoId) => 
  api.delete(`/alunos/${alunoId}/cursos/${cursoId}`);

// Cursos
export const getCursos = () => api.get('/cursos');
export const getCurso = (id) => api.get(`/cursos/${id}`);
export const createCurso = (curso) => api.post('/cursos', curso);
export const updateCurso = (id, curso) => api.put(`/cursos/${id}`, curso);
export const deleteCurso = (id) => api.delete(`/cursos/${id}`);

// Autenticação
export const login = (username, password) => {
  const auth = btoa(`${username}:${password}`);
  localStorage.setItem('auth', auth);
  localStorage.setItem('username', username);
  return auth;
};

export const logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('username');
};

export const isAuthenticated = () => {
  return localStorage.getItem('auth') !== null;
};

export default api;
