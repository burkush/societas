import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);
  const register = useAuthStore((state) => state.register);

  async function handleRegister(
    email,
    password,
    firstName,
    lastName,
    birthDate
  ) {
    await register(email, password, firstName, lastName, birthDate);
    navigate('/dashboard');
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create new account
      </h2>
      <form className="max-w-2xl flex flex-col mx-auto">
        <fieldset className="flex gap-x-5 mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="date"
            name="birthdate"
            id="birthdate"
            className="border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex gap-x-5 mb-4">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
            className="border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
            className="border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        <fieldset className="mb-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button
          type="button"
          className="mb-6 text-white bg-blue-400 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center"
          onClick={() =>
            handleRegister(email, password, firstName, lastName, birthDate)
          }
        >
          Sign up
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
};

export default SignUp;
