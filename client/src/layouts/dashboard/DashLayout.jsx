import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store';

const DashLayout = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default DashLayout;
