import { BACKEND_URL } from '../constants.js';

export const fetchConfig = async () => {
  const response = await fetch(`${BACKEND_URL}/config`, { credentials: 'include' });
  return await response.json();
}

export const logout = async () => {
  await fetch(`${BACKEND_URL}/logout`, { credentials: 'include', method: 'POST' });
}
