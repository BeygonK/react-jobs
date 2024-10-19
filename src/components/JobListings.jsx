import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import axios from 'axios'

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 3;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async (page) => {
      const apiUrl = isHome ? `http://localhost:5000/api/v1/jobs?page=${page}&limit=${limit}` : `http://localhost:5000/api/v1/jobs`;
      try {
        const res = await axios.get(apiUrl);
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-green-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
            
          </div>
        )}
      </div>
      
    </section>
  );
};
export default JobListings;
