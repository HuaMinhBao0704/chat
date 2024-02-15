/* eslint-disable no-unused-vars, react/prop-types */
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractDateTime } from '../../utils/extractTime';

const MessageItem = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromCurrentUser = message.senderId === authUser._id;
  const formattedDateTime = extractDateTime(message.createdAt).dateTime;
  const chatClassName = fromCurrentUser ? 'chat chat-end' : 'chat chat-start';
  const profilePic = fromCurrentUser
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromCurrentUser ? 'bg-blue-500' : '';

  return (
    <div className={chatClassName}>
      <div className='avatar chat-image'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt='user avatar' />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer mt-1 flex items-center gap-1 text-xs opacity-50'>
        {formattedDateTime}
      </div>
    </div>
  );
};

export default MessageItem;
