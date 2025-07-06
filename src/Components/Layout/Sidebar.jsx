import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Settings,
  Wallet,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: <LayoutDashboard className="h-5 w-5" />,
      description: 'Overview'
    },
    { 
      name: 'Budget', 
      path: '/budget', 
      icon: <Wallet className="h-5 w-5" />,
      description: 'Income & Expenses'
    },
    { 
      name: 'Transactions', 
      path: '/expenses', 
      icon: <PieChart className="h-5 w-5" />,
      description: 'Track Spending'
    },
    { 
      name: 'Forecast', 
      path: '/forecast', 
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Net Worth Projection'
    },
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Reports & Insights'
    }
  ];
  
  return (
    <aside className="hidden md:flex flex-col w-72 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FinTrack</h1>
            <p className="text-sm text-gray-500">Personal Finance</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`mr-3 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                </div>
                <p className={`text-xs mt-0.5 ${
                  isActive ? 'text-primary-500' : 'text-gray-500'
                }`}>
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
      
      {/* Settings */}
      <div className="p-4 border-t border-gray-100">
        <Link
          to="/settings"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Settings className="h-5 w-5 mr-3 text-gray-400" />
          Settings
        </Link>
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full">
            <span className="text-sm font-medium text-white">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">User</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;