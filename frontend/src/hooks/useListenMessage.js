import { useEffect } from 'react';

import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on('new_message', (newMessage) => {
      newMessage.shouldShake = true;

      const sound = new Audio(notificationSound);
      sound.play();
      
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
