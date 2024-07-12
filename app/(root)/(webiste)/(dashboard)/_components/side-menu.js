'use client'
import React from 'react';

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-orange-200 border-r w-64 shadow-lg transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <ul className="mt-4">
          <li className="py-2">Item 1</li>
          <li className="py-2">Item 2</li>
          <li className="py-2">Item 3</li>
          {/* Add more items as needed */}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};

export default SideMenu;
