import ConversationItem from './ConversationItem';
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className='flex flex-col overflow-auto py-2'>
      {conversations.map((conversation, idx) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto' /> : null}
    </div>
  );
};

export default Conversations;
