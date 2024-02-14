import ConversationItem from './ConversationItem';

const Conversations = () => {
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
