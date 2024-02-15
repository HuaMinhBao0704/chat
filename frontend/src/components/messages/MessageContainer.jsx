import { useEffect } from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';
import useConversation from '../../zustand/useConversation';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // When the component unmounts, set the selected conversation to null
    return () => setSelectedConversation(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedConversation]);

  return (
    <div className='flex flex-col md:min-w-[450px]'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='mb-2 bg-slate-500 px-4 py-2'>
            <span className='label-text'>To:</span>{' '}
            <span className='font-bold text-gray-900'>John Doe</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
