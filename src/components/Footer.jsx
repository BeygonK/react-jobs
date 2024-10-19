import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">FindJob</h2>
            <p className="text-sm">Your gateway to the best tech jobs.</p>
          </div>
          <nav className="flex flex-col md:flex-row">
            <Link to="/" className="text-white hover:text-green-200 mx-2">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-green-200 mx-2">
              About
            </Link>
            <Link to="/jobs" className="text-white hover:text-green-200 mx-2">
              Jobs
            </Link>
            <Link to="/contact" className="text-white hover:text-green-200 mx-2">
              Contact
            </Link>
          </nav>
        </div>
        <hr className="my-4 border-green-500" />
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} kipkoechbeygone@gmail.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
