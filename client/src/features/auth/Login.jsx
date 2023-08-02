import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);
  const login = useAuthStore((state) => state.login);

  async function handleLogin(email, password) {
    await login(email, password);
    navigate('/dashboard');
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form className="max-w-sm flex flex-col mx-auto">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="mb-4 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="mb-4 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="mb-6 text-white bg-blue-400 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center"
          onClick={() => handleLogin(email, password)}
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm">
        Don't have account yet?{' '}
        <Link to="/register" className="text-sm text-blue-600 hover:underline">
          Create account
        </Link>
      </p>
    </main>
  );
};

export default Login;
