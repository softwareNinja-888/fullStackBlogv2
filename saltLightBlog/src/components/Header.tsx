import { MobileMenu } from './helper/MobileMenu'
import { Line } from "./helper/Line";
import { LogoSvg } from './helper/LogoSvg';

import { useNavigate } from '@tanstack/react-router';
import { useState,useEffect } from 'react';

import React from 'react';

import { useQuery } from '@tanstack/react-query';

export function Header({
    logoImg='/logo.svg',
    links=['Home','Blogs','Log In/Sign Up',],
    btnName="Let's Talk",
    sticky=true,
  }) {

  const { data, isLoading } = useQuery({
    queryKey: ['siteTitle'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/posts');
      return res.json();
    },
  });

  const [menuOpen, setMenuOpen ] = useState(false)
  const [error, setError ] = useState()
  const navigate = useNavigate()

 
  function handleNav(path) {
    if (!path || typeof path !== 'string') return;

    const cleaned = '/' + path.trim().replace(/\s+/g, '').toLowerCase();

    navigate({ to: cleaned });
  }


  useEffect(() => {
    if (data) console.log('DATA FROM API:', data);
    if (error) console.error('Error fetching:', error);
  }, [data, error]); 

   // return <h1>{isLoading ? 'Loading title...' : data?.title}</h1>;

    return ( 
        <>
          <div className={`${sticky ? 'sticky top-0 z-50' : ''}`}>
            <div className={`bg-white flex justify-between mx-auto md:justify-between items-center px-10 md:px-23 py-12 h-16 `}>

                {/*LOGO*/}
                <div className="flex justify-center items-center gap-2 text-black cursor-pointer" onClick={()=>{handleNav("/")}}>
                    <LogoSvg path='/svgLogo/logo6.svg'/>
                </div>
                
                {/*LINKS*/}
                <nav className={`hidden md:flex md:space-x-10 lg:space-x-20 text-xl font-mont`}>
                    {links.map((link,index)=>{
                        return ( 
                            <div key={index} className={`flex gap-1.5 no-underline relative cursor-pointer after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out hover:after:opacity-100 hover:after:bg-black text-black max-[500px]:text-xs` } onClick={()=>{handleNav(`/${link === 'Home' ? '' : link}`)}}>
                                {link}
                            </div>
                        )
                    })}
                </nav>

                {/*MENU MOBILE*/}
                <div className="md:hidden">
                    <svg
                        onClick={() => setMenuOpen(!menuOpen)} 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    {menuOpen && <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} links={links} />}
                </div>    
              </div>

              {/*LINE DIVIDER*/}
              <Line/>
          </div>       
        </>
    )
} 
