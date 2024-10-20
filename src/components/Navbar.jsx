import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo2.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from'react';
import { AuthContext } from '../auth/authContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          {/* Hamburger menu button */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-expanded={isMenuOpen}
            >
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>

          {/* Logo and name */}
          <div className='flex flex-1 items-center justify-center md:justify-start'>
            <NavLink className='flex items-center' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='text-white text-2xl font-bold ml-2'>FindJob</span>
            </NavLink>
          </div>

          {/* Links for desktop */}
          <div className='hidden md:block md:ml-auto'>
            <div className='flex space-x-4'>
              <NavLink to='/' className={linkClass}>
                Home
              </NavLink>
              <NavLink to='/jobs' className={linkClass}>
                Jobs
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to='/add-job' className={linkClass}>
                    Add Job
                  </NavLink>
                  <NavLink to='/profile' className={linkClass}>
                    Profile
                  </NavLink>
                  <button onClick={handleLogout} className='text-white'>
                    Logout
                  </button>
                </>
              ) : (
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              <NavLink to='/' className={linkClass}>
                Home
              </NavLink>
              <NavLink to='/jobs' className={linkClass}>
                Jobs
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to='/add-job' className={linkClass}>
                    Add Job
                  </NavLink>
                  <NavLink to='/profile' className={linkClass}>
                    Profile
                  </NavLink>
                  <button onClick={handleLogout} className='text-white'>
                    Logout
                  </button>
                </>
              ) : (
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
        )}
      </div>
    </nav>
  );
};
export default Navbar;
