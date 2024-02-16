import { MessageContainer, Sidebar } from '../../components';
import { useAuthContext } from '../../context/AuthContext';

const Home = () => {
  const { authUser } = useAuthContext();

  if (authUser) {
    document.title=`Current user: ${authUser.username}`;
  }

  return (
    <div className='flex overflow-hidden rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding backdrop-blur-lg backdrop-filter sm:h-[450px] md:h-[550px]'>
      {/* Sidebar (include users without current user) */}
      <Sidebar />

      {/* Message container */}
      <MessageContainer />
    </div>
  );
};

export default Home;
