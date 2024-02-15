import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';

const MessageContainer = () => {
  const noChatSelected = false;

  return (
    <div className='flex flex-col md:min-w-[450px]'>
      {noChatSelected ? (
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
