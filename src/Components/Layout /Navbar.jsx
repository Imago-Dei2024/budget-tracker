import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">FinTrack</Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/budget" className="px-3 py-2 text-gray-700 hover:text-blue-600">Budget</Link>
          <Link to="/expenses" className="px-3 py-2 text-gray-700 hover:text-blue-600">Expenses</Link>
          <Link to="/forecast" className="px-3 py-2 text-gray-700 hover:text-blue-600">Forecast</Link>
          <div className="ml-4">
            <UserCircle className="h-8 w-8 text-gray-500" />
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
          <Link to="/budget" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Budget</Link>
          <Link to="/expenses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Expenses</Link>
          <Link to="/forecast" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Forecast</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;