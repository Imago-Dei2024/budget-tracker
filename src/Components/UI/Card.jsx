import React from 'react';

const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-medium text-gray-700">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;