import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/new-chat':
        return 'New Chat';
      case '/chat-history':
        return 'Chat History';
      case '/dream-team':
        return 'Dream Team';
      case '/gyb-live-network':
        return 'GYB Live Network';
      case '/settings':
        return 'Settings';
      case '/new-post':
        return 'GYB Content AI';
      case '/road-map':
        return 'Roadmap';
      default:
        return '';
    }
  };

  const handleLogoClick = () => {
    navigate('/new-chat', { state: { selectedAgent: 'Mr.GYB AI' } });
  };

  return (
    <>
      <header className="bg-white text-navy-blue shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-2 sm:p-4">
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <img src="/gyb-logo.svg" alt="GYB Logo" className="h-8 sm:h-10" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold">{getPageTitle()}</h1>
          <button className="text-navy-blue" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} userData={userData} />
    </>
  );
};

export default Header;