/**
 * JDS Iron and Steels — Local Auth
 * Replaces Firebase Authentication with sessionStorage-based auth.
 *
 * Admin credentials:
 *   Username: admin
 *   Password: jds2025admin
 */

const SESSION_KEY = 'jds_admin_auth';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Change this password as needed
  password: 'jds2025admin',
};

export const login = (username, password) => {
  if (
    username.trim().toLowerCase() === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = () => {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
};
