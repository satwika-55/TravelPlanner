import React from 'react';
import Header from '../components/common/Header.jsx';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/ui/sonner.jsx';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <div className="min-h-screen bg-black text-white">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
