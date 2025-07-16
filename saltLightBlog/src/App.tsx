import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// PAGES:
import Home from './pages/Home';
import {Blogs} from './pages/Blogs';
import BlogPage from './pages/BlogPage';
import { Layout } from './pages/Layout';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RouterProvider,
  createRoute,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Layout />,
});

const blogsRoute = createRoute({
  path: '/blogs',
  getParentRoute: () => rootRoute,
  component: Blogs,
});

const BlogPageRoute = createRoute({
  path: '/blogs/$slug',
  getParentRoute: () => rootRoute,
  loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3000/api/posts/${params.slug}`)
    if (!res.ok) throw new Error('Failed to fetch blog post')
    const data = await res.json()
    return data
  },
  component: BlogPage,
})


const routeTree = rootRoute.addChildren([
  createRoute({
    path: '/',
    getParentRoute: () => rootRoute,
    component: () => <Home/>,
  }),
  blogsRoute,
  BlogPageRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}



