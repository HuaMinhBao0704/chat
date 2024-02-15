import { useState } from 'react';
import { Link } from 'react-router-dom';

import GenderCheckbox from './GenderCheckbox';
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {
  const [signUpInputs, setSignUpInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const {loading, signUp} = useSignUp();

  const handleCheckboxChange = (gender) => {
    setSignUpInputs({ ...signUpInputs, gender });
  };

  const handleSignUpSubmit = async (ev) => {
    ev.preventDefault();
    await signUp(signUpInputs);
  };

  return (
    <div className='mx-auto flex min-w-96 flex-col items-center justify-center'>
      <div className='w-full rounded-lg bg-gray-400 bg-opacity-0 bg-clip-padding p-6 shadow-md backdrop-blur-lg backdrop-filter'>
        <h1 className='text-center text-3xl font-semibold text-gray-500'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSignUpSubmit}>
          {/* Full name */}
          <div>
            <label className='label-text text-base'>Full name</label>
            <input
              type='text'
              placeholder='Full name'
              className='input input-bordered h-10 w-full'
              value={signUpInputs.fullName}
              onChange={(ev) =>
                setSignUpInputs({ ...signUpInputs, fullName: ev.target.value })
              }
            />
          </div>

          {/* Username */}
          <div>
            <label className='label-text text-base'>Username</label>
            <input
              type='text'
              placeholder='Username'
              className='input input-bordered h-10 w-full'
              value={signUpInputs.username}
              onChange={(ev) =>
                setSignUpInputs({ ...signUpInputs, username: ev.target.value })
              }
            />
          </div>

          {/* password */}
          <div>
            <label className='label-text text-base'>Password</label>
            <input
              type='password'
              placeholder='Password'
              className='input input-bordered h-10 w-full'
              value={signUpInputs.password}
              onChange={(ev) =>
                setSignUpInputs({ ...signUpInputs, password: ev.target.value })
              }
            />
          </div>

          {/* Confirm password */}
          <div>
            <label className='label-text text-base'>Confirm password</label>
            <input
              type='password'
              placeholder='Confirm password'
              className='input input-bordered h-10 w-full'
              value={signUpInputs.confirmPassword}
              onChange={(ev) =>
                setSignUpInputs({
                  ...signUpInputs,
                  confirmPassword: ev.target.value
                })
              }
            />
          </div>

          {/* GENDER CHECKBOX */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={signUpInputs.gender}
          />

          <Link
            to={'/login'}
            className='mt-2 inline-block text-sm hover:text-blue-600 hover:underline'
          >
            Already have an account?
          </Link>

          <div>
            <button className='bnt-sm btn btn-block mt-2' disabled={loading}>
              {loading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
