// REPLACE WITH ICONS
import { X } from 'lucide-react';

import React from "react";
import { motion } from "framer-motion";

import { useNavigate } from '@tanstack/react-router';

export function MobileMenu({ menuOpen, setMenuOpen,links=[''] }){

  // Animation variants for menu:
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // HANDLE NAVIGATION:
  const navigate = useNavigate()
  
  function handleNav(path){
		navigate(path.replace(/\s+/g,'').toLowerCase())
    setMenuOpen(!menuOpen)
	}

  return (
    <>
      {/* Background Overlay */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-100 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onClick={setMenuOpen} // Close menu when clicking outside
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      />

      {/* Animated Menu */}
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        {/* CLOSE BTN */}
        <X onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-2xl w-5"/>

        {/* Links */}
        <nav className="flex flex-col space-y-4 text-lg font-poppins items-center">
          {links.map((link,index)=>{
              return (
                  
                  <div key={index} className={`flex gap-1.5 no-underline relative cursor-pointer after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out hover:after:opacity-100 hover:after:bg-white  text-white max-[500px]:text-xs` } onClick={()=>{handleNav(`/${link === 'Home' ? '' : link}`)}}>
                      {link}
                  </div>
              )
          })}
        </nav>
   
        </motion.div>
    </>
  );
};
