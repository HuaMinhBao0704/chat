import ConversationItem from './ConversationItem';
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  
  console.log("CONVERSATIONS: ", conversations);

  return (
    <div className='flex flex-col overflow-auto py-2'>
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
    </div>
  );
};

export default Conversations;
