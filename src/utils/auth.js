import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem('token');

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserRoles = () => {
  const token = getToken();
  if (!token) return [];
  const decoded = jwtDecode(token);
  return decoded.roles || [];
};

export const isAuthenticated = () => !!getToken();
