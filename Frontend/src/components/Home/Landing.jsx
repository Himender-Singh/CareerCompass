import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import landingImg from '../../assets/landingImg.png';
import bgImage from '../../assets/bg.jpg';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div
      className="min-h-screen mt-8 pb-10 bg-[#020617] font-poppins bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Darker black overlay */}
      <div className="absolute inset-0 bg-[#080101] opacity-90"></div> {/* Changed to pure black */}

      <div className="container max-w-screen-xl mx-auto lg:px-16 flex flex-col-reverse md:flex-row items-center relative z-10 px-4">
        {/* Left - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Transform Your Career
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
            with Expert Guidance
          </h1>
          <p className="text-gray-300 font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
            Unlock your potential with personalized career counseling and interactive tools tailored to your strengths and aspirations.
          </p>

          {/* Get Started Button */}
          <button className="mt-6 bg-blue-500 text-white w-full md:w-auto px-4 sm:px-6 py-3 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2">
            <Link to={"/login"}>Get Started</Link>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src={landingImg}
            alt="Career guidance illustration"
            className="w-full max-w-xs sm:max-w-md md:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
