import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Login, SignUp, Home } from './pages';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <Routes>
        <Route
          path='/'
          element={authUser ? <Home /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/login'
          element={authUser ? <Navigate to={'/'} /> : <Login />}
        />
        <Route
          path='/signup'
          element={authUser ? <Navigate to={'/'} /> : <SignUp />}
        />
      </Routes>
      <Toaster position='top-right' />
    </div>
  );
};

export default App;
