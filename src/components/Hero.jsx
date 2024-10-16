/* eslint-disable react/prop-types */
const Hero = ({
  // eslint-disable-next-line react/prop-types
  title = 'Become a Software Engineer',
  subtitle = 'Find the developer job that fits your skill set',
}) => {
  return (
    <section className='bg-green-600 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-5xl'>
            {title}
          </h1>
          <p className='my-4 text-xl text-white'>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
