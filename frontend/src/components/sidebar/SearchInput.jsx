import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';

import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearchSubmit = async (ev) => {
    ev.preventDefault();

    if (!searchTerm) return;

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchTerm('');
    } else toast.error('No such user found!');
  };

  return (
    <form onSubmit={handleSearchSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered rounded-full'
        value={searchTerm}
        onChange={(ev) => setSearchTerm(ev.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='h-6 w-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
