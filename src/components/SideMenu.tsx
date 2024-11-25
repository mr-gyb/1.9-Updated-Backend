import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, Settings, LogOut, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: {
    name?: string;
    email?: string;
  };
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, userData }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-navy-blue transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col overflow-y-auto`}
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={onClose} className="text-navy-blue">
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-6">
          <div className="space-y-2">
            <Link to="/profile" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
              <User size={20} className="mr-2" />
              My Profile
            </Link>
            <Link to="/ai-video-avatar" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
              <Video size={20} className="mr-2" />
              AI Video Avatar
            </Link>
            <Link to="/settings" className="flex items-center py-2 hover:text-gold" onClick={onClose}>
              <Settings size={20} className="mr-2" />
              Settings
            </Link>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center py-2 text-red-500 hover:text-red-600 w-full"
            >
              <LogOut size={20} className="mr-2" />
              Logout {userData?.email ? `(${userData.email})` : ''}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;