/* eslint-disable react/prop-types */
import useConversation from '../../zustand/useConversation';

const ConversationItem = ({ conversation, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation?._id;

  return (
    <>
      <div
        className={`flex cursor-pointer items-center gap-2 rounded p-2 py-1 hover:bg-sky-500 ${isSelected && 'bg-sky-500'}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src={conversation?.profilePic} alt={conversation?.username} />
          </div>
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between gap-3'>
            <p className='font-bold text-gray-200'>{conversation?.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 h-1 py-0' />}
    </>
  );
};

export default ConversationItem;
