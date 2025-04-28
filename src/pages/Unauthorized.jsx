// Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // if you're using shadcn/ui

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
       <img
        src="/accessdenied.jpg"
        alt="Unauthorized Access"
        className="w-1/2 md:w-[200px] h-auto mb-6"
        /> 
      <h1 className="text-4xl font-bold mb-4 text-red-600">Access Denied</h1>
      <p className="text-lg text-gray-600 mb-6">
        You do not have permission to view this page.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
// This component can be used to display an unauthorized access message when a user tries to access a restricted page without the necessary permissions. It provides a button to return to the home page.