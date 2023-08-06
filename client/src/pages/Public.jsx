import React, { useEffect } from 'react';

const Public = () => {
  useEffect(() => {
    document.title = 'Societas';
  }, []);

  return <main>Public page with list of posts and ideas.</main>;
};

export default Public;
