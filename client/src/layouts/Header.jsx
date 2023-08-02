import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo/logo_100.svg';
import { BiUserCircle } from 'react-icons/bi';
import { useAuthStore } from '../app/store';

const Header = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header className="mb-7 p-2 bg-slate-900">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="flex-initial"
          />
        </Link>

        <nav className="flex-initial flex items-center gap-10">
          {isAuth ? (
            <div className="flex items-center gap-10">
              <Link to="/dashboard">
                <BiUserCircle className="text-slate-300 text-3xl" />
              </Link>
              <button
                type="button"
                className="py-1 px-3 text-slate-100 bg-red-500 rounded-md ease-in-out duration-200 hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-slate-100 hover:underline">
                Login
              </Link>
              <Link
                to="/register"
                className="py-1 px-3 text-slate-100 bg-green-700 rounded-md ease-in-out duration-200 hover:bg-green-800"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
