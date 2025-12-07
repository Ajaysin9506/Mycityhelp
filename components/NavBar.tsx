import React from 'react';
import { ViewState } from '../types';
import { LayoutGrid, MapPin, Users, AlertCircle, ShoppingBag, Home } from 'lucide-react';

interface NavBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, setView }) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'SERVICES', label: 'Services', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'SKILLS', label: 'Skills', icon: <Users className="w-4 h-4" /> },
    { id: 'LOSTFOUND', label: 'Lost & Found', icon: <MapPin className="w-4 h-4" /> },
    { id: 'COMPLAINTS', label: 'Civic', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'DELIVERY', label: 'Shops', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1f2328] text-white border-b border-gray-700 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <MapPin className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">MyCityHelp</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button (simplified for this demo) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav (Simple overlay for demo purposes) */}
      <div className="md:hidden flex overflow-x-auto space-x-2 px-4 pb-2 scrollbar-hide">
         {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${
                currentView === item.id
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
      </div>
    </nav>
  );
};