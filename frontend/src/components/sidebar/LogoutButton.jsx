import { BiLogOut } from 'react-icons/bi';

import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='mt-4'>
      {!loading ? (
        <BiLogOut
          className='h-6 w-6 cursor-pointer text-white'
          onClick={logout}
        />
      ) : (
        <span className='loading loading-spinner' />
      )}
    </div>
  );
};

export default LogoutButton;
