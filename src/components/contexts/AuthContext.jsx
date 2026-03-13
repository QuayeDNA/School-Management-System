import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import bcrypt from 'bcryptjs';
import db from '../../db/db';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = useCallback(async (username, email, password) => {
    const hashed = await bcrypt.hash(password, 10);
    const id = await db.users.add({ username, email, password: hashed, role: 'admin' });
    const user = await db.users.get(id);
    const sanitized = { id: user.id, username: user.username, email: user.email, role: user.role };
    setCurrentUser(sanitized);
    localStorage.setItem('currentUser', JSON.stringify(sanitized));
    return sanitized;
  }, []);

  const login = useCallback(async (username, password) => {
    const user = await db.users.get({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid username or password');
    }

    const sanitized = { id: user.id, username: user.username, email: user.email, role: user.role };
    setCurrentUser(sanitized);
    localStorage.setItem('currentUser', JSON.stringify(sanitized));
    return sanitized;
  }, []);

  const resetPassword = useCallback(async (email, newPassword) => {
    const user = await db.users.get({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.users.update(user.id, { password: hashed });
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const contextValue = useMemo(() => ({ currentUser, signUp, login, resetPassword, logout, loading }), [currentUser, signUp, login, resetPassword, logout, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};