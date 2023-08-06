import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-screen-xl mt-7 mx-auto px-4 flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
