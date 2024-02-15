import { TiMessages } from 'react-icons/ti';

const NoChatSelected = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2 py-4 text-center font-semibold text-gray-200 sm:text-lg md:text-xl'>
        <p>Welcome ✌️ Humiba ✌️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-center text-3xl md:text-6xl' />
      </div>
    </div>
  );
};

export default NoChatSelected;