import { Header } from '../components/Header';
import {Footer} from '../components/Footer';
import { PageScrollToTop } from '../components/helper/PageScrollToTop'
import { Outlet } from '@tanstack/react-router';
import React from 'react';

export function Layout() {
  return (
    <div>
      <PageScrollToTop/>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}