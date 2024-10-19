import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import {AuthProvider} from './auth/authContext'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import JobPage from './pages/JobPage';
import { jobLoader } from './pages/JobPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/add-job' element={<AddJobPage />} />
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/profile' element={<ProfilePage />} />
      <Route
        path='/edit-job/:id'
        //element={<EditJobPage updateJobSubmit={updateJob} />}
      />
      <Route
        path='/jobs/:id'
        element={<JobPage />}
        loader={jobLoader}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>  {/* Wrap with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
export default App;
