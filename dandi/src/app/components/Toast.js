import React from 'react';

const Toast = ({ message, type }) => {
  const gradientClass = type === 'error' 
    ? 'bg-red-500' 
    : 'bg-gradient-to-r from-purple-500 to-yellow-500';

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-start pt-4 z-50">
      <div className={`px-4 py-2 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in-down ${gradientClass} text-white`}>
        {type === 'error' ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;