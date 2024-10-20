import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content area, grows to take up available space */}
      <main className="flex-grow">
        <Outlet />
        <ToastContainer />
      </main>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
