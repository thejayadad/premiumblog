'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import SideBarLinks from './side-bar-links';

const MobileNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex md:hidden'>
      {/* Menu Icon */}
      {!isOpen && (
        <FiMenu
          className='text-2xl text-gray-500 cursor-pointer h-10 w-10 rounded-xl p-2 bg-gray-200 hover:bg-gray-300'
          onClick={toggleSidebar}
        />
      )}

      {/* Close Icon */}
      {isOpen && (
        <FiX
          className='text-2xl cursor-pointer text-gray-500 h-10 w-10 rounded-xl p-2 bg-gray-200 hover:bg-gray-300 z-[1555]'
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r w-64 shadow-lg transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex flex-col mt-12 p-4'>
          <SideBarLinks />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
