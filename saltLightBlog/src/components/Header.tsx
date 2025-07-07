import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Header() {
  const { data, isLoading } = useQuery(['siteTitle'], async () => {
    const res = await fetch('https://dummyapi.io/header-title');
    return res.json();
  });

  return <h1>{isLoading ? 'Loading title...' : data?.title}</h1>;
} 