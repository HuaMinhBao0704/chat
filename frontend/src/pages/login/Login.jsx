import { Link } from 'react-router-dom';
import { useState } from 'react';

import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    await login(username, password);
  };

  return (
    <div className='mx-auto flex min-w-96 flex-col items-center justify-center'>
      <div className='w-full rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding p-6 shadow-md backdrop-blur-lg backdrop-filter'>
        <h1 className='text-center text-3xl font-semibold text-gray-500'>
          Login <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='input input-bordered h-10 w-full'
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='input input-bordered h-10 w-full'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>

          <Link
            to={'/signup'}
            className='mt-2 inline-block text-sm hover:text-blue-600 hover:underline'
          >
            {"Don't"} have an account? Sign up here.
          </Link>

          <div>
            <button className='bnt-sm btn btn-block mt-2' disabled={loading}>
              {loading ? (
                <span className='loading loading-spinner '></span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
