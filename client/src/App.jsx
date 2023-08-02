import React, { useState, useEffect } from 'react';
import { useAuthStore } from './app/store';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Loading from './components/Loading';
import Public from './pages/Public';
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import DashLayout from './layouts/dashboard/DashLayout';
import Profile from './layouts/dashboard/Profile';
import NotFound from './pages/NotFound';

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isAuthCheckCompleted, setAuthCheckCompleted] = useState(false);

  useEffect(() => {
    async function auth() {
      if (localStorage.getItem('token')) {
        await checkAuth();
      }
      setAuthCheckCompleted(true);
    }
    auth();
  }, []);

  if (!isAuthCheckCompleted) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />

        <Route path="dashboard" element={<DashLayout />}>
          <Route index element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
