import { useContext, createContext, useState, useEffect } from 'react';
import { authStatus } from '../../api/backend';
import { getLogout } from '../../api/backend';

const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const response = await authStatus();
      if (response.isAuthenticated) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await getLogout();
      setUser(null);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function isAuth() {
    return !!user;
  }

  return (
    <UserContext.Provider value={{ user, logout, loading, isAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
