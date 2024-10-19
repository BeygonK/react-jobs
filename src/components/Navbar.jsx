import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo2.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from'react';
import { AuthContext } from '../auth/authContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const sessionId = localStorage.getItem('sessionId'); // Assume sessionId is stored after login
      if (!sessionId) return;

      try {
        // Check with the backend if the sessionId/token is valid
        const res = await axios.get('http://localhost:5000/api/v1/auth/verify', {
          headers: {
            session: sessionId,
          },
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('User not authenticated');
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('sessionId');
    setIsAuthenticated(false);
    toast.success('Logged out successfully'); // Show success toast message
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  
  return (
    <nav className='bg-green-600 border-b border-green-600'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                FindJob
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/jobs' className={linkClass}>
                  Jobs
                </NavLink>
                {/** show links only if authenticated */}
                {isAuthenticated ? (
                  <>
                  <NavLink to='/add-job' className={linkClass}>
                  Add Job
                  </NavLink>
                  <NavLink to='/profile' className={linkClass}>
                  Profile
                  </NavLink>
                  <button onClick={handleLogout} className="text-white cursor-pointer">
                  Logout
                  </button>
                  </>
                  ): (
                <>
                  <NavLink to='/register' className={linkClass}>
                  Signup
                </NavLink>
                <NavLink to='/login' className={linkClass}>
                  Login
                </NavLink>
                </>
                
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
