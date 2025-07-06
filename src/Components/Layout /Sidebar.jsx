import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, DollarSign, TrendingUp, PieChart, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Budget', path: '/budget', icon: <DollarSign className="h-5 w-5" /> },
    { name: 'Expenses', path: '/expenses', icon: <PieChart className="h-5 w-5" /> },
    { name: 'Forecast', path: '/forecast', icon: <TrendingUp className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> }
  ];
  
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-blue-600">FinTrack</h1>
        <p className="text-sm text-gray-500">Personal Finance Dashboard</p>
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;