import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import { useAuthContext } from './AuthContext';

export const SocketContext = createContext();

// eslint-disable-next-line no-unused-vars, react/prop-types
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:5000', {
        query: { userId: authUser._id }
      });

      setSocket(newSocket);

      newSocket.on('get_online_users', (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    console.log(onlineUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);
