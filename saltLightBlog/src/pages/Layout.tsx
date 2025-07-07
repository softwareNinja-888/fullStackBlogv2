import { Header } from '../components/Header';
import {Footer} from '../components/Footer';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}