import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/authContext';


const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();
  const { user } = useContext(AuthContext);
  const [ isCreator, setIsCreator ] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user and job are available before comparing
    if (user && job && !loading) {
      setIsCreator(job.userId === user._id);
      console.log(user);
      setLoading(false);
    }
  }, [user, job, loading]);


  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?'
    );

    if (!confirm) return;

    //deleteJob(jobId);

    toast.success('Job deleted successfully');

    navigate('/jobs');
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/jobs'
            className='text-green-500 hover:text-green-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className='bg-green-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaMapMarker className='text-orange-700 mr-1' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-green-800 text-lg font-bold mb-6'>
                  Job Description
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-green-800 text-lg font-bold mb-2'>
                  Salary
                </h3>

                <p className='mb-4'>{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                <h2 className='text-2xl'>{job.companyName}</h2>

                <p className='my-2'>{job.companyDescription}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-green-100 p-2 font-bold'>
                  {job.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>

                <p className='my-2 bg-green-100 p-2 font-bold'>
                  {' '}
                  {job.contactPhone}
                </p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                { isCreator ? (
                  <>
                    <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                  <Link
                    to={`/edit-job/${job.id}`}
                    className='bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >
                    Edit Job
                  </Link>
                  <button
                    onClick={() => onDeleteClick(job.id)}
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >
                    Delete Job
                  </button>
                  </>
                ) : (
                  <>
                    <Link
                    to={`/apply/${job.id}`}
                    className='bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >
                    Apply
                  </Link>
                  </>
                )}
                
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/jobs/${params.id}`);
  
      // Check if the response is OK
      if (!res.ok) {
        throw new Error(`Failed to fetch job with id ${params.id}: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error loading job:", error);
      throw new Error("Error loading job data");
    }
  };
  

export { JobPage as default, jobLoader };