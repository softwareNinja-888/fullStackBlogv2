import { Header } from '../components/Header';
// import Footer from '../components/Footer';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <h1 className="text-4xl text-center text-blue-900">Hi this is footer</h1>
      {/*<Footer />*/}
    </div>
  );
}