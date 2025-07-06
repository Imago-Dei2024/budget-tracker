import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FinTrack. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</a>
          <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;