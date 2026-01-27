import api from './api';

// Registrar usuario
const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Iniciar sesión
const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Obtener usuario actual (perfil)
const getMe = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Cerrar sesión
const logout = () => {
  localStorage.removeItem('token');
};

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('profile_picture', file);
  console.log('realizando peticion...');
  const response = await api.post('/users/upload', formData);
  console.log(response.data);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
  uploadAvatar,
};

export default authService;