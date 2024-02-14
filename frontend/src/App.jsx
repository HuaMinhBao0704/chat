import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import { Login, SignUp } from './pages';

const App = () => {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
