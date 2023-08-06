import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Societas | Page not found';
  }, []);

  return (
    <main className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl text-slate-700 mb-6">Page not found</h2>
      <Link to="/" className="text-blue-600 hover:underline">
        Return to the homepage
      </Link>
    </main>
  );
};

export default NotFound;
