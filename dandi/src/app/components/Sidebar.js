'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: 'Overview', icon: '🏠', path: '/dashboard' },
    { name: 'Research Assistant', icon: '🔬', path: '/research-assistant' },
    { name: 'Research Reports', icon: '📊', path: '/research-reports' },
    { name: 'API Playground', icon: '🧪', path: '/playground' }, // Updated path
    { name: 'Invoices', icon: '📄', path: '/invoices' },
    { name: 'Documentation', icon: '📚', path: '/documentation' },
  ];

  if (!mounted) return null;

  return (
    <>
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Dandi AI</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-grow">
          <ul className="py-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <span className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 ${
                    pathname === item.path ? 'bg-gray-100 font-semibold' : ''
                  }`}>
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t flex items-center">
          <Image src="/user-avatar.png" alt="User Avatar" width={40} height={40} className="rounded-full" />
          <span className="ml-3 text-gray-700">Yamit Mody</span>
          <button className="ml-auto text-gray-400 hover:text-gray-600">⚙️</button>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;