import { createContext, useState, useEffect } from 'react';

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user information here

  // Function to check if sessionId and user data exist in localStorage
  const checkAuth = () => {
    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      setIsAuthenticated(true);
      fetchUserDetails(sessionId);
    } else {
      setIsAuthenticated(false);
    }
  };

  // Fetch user details based on sessionId
  const fetchUserDetails = async (sessionId) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/user/profile', {
        headers: {
          'session': sessionId,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userData = await response.json();
      setUser(userData); // Set user details in state
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null); // Reset user if there's an error
    }
  };


  // Check auth status on component mount
  useEffect(() => {
    checkAuth();
  }, [user]);

  // Function to handle user login (set user data and sessionId in localStorage)
  const login = (userData, sessionId) => {
    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data as string
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
