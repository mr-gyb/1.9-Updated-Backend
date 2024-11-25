import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Plus, LayoutDashboard, Map } from 'lucide-react';

const BottomMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/new-chat', icon: Home, label: 'Home' },
    { path: '/gyb-live-network', icon: Users, label: 'Live Network' },
    { path: '/new-post', icon: Plus, label: 'Create' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/road-map', icon: Map, label: 'Roadmap' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              location.pathname === item.path ? 'text-navy-blue' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomMenu;