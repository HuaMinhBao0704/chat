import { useState } from 'react';
import { BsSend } from 'react-icons/bs';

import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSendMessage = async (ev) => {
    ev.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form className='my-3 px-4' onSubmit={handleSendMessage}>
      <div className='relative w-full'>
        <input
          type='text'
          className='block w-full rounded-lg border border-none border-gray-600 bg-gray-700 p-2.5 text-sm text-white outline-none'
          placeholder='Send a message'
          onChange={(ev) => setMessage(ev.target.value)}
          value={message}
        />
        <button
          type='submit'
          className='absolute inset-y-0 end-0 flex cursor-pointer items-center border-none pe-3 outline-none hover:text-gray-300'
        >
          {loading ? <span className='loading loading-spinner' /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
