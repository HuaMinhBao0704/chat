import { TiMessages } from 'react-icons/ti';

import { useAuthContext } from '../../context/AuthContext';

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2 py-4 text-center font-semibold text-gray-200 sm:text-lg md:text-xl'>
        <p>Welcome ✌️ {authUser.fullName} ✌️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-center text-3xl md:text-6xl' />
      </div>
    </div>
  );
};

export default NoChatSelected;