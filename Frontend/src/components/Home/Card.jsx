import React from "react";

const Card = ({ img, title, desc }) => {
  return (
    <div className="w-full sm:w-[22rem] gap-2 md:w-[28rem] border border-gray-700 shadow-lg rounded-lg p-4 space-y-3 relative overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      
      {/* Fixed size for the image with border and rounded corners */}
      <div className="flex justify-center border-gray-600 mb-4">
        <img 
          src={img} 
          alt={title} 
          className="object-cover transition-transform duration-300 transform hover:scale-105 w-full h-40 md:h-48 rounded-md" // Added h-40 for height
        />
      </div>

      {/* Card title with improved styling */}
      <h1 className="font-bold text-white text-xl text-start">{title}</h1>
      
      {/* Description with improved readability */}
      <p className="text-sm text-gray-300 leading-6 text-start">
        {desc}
      </p>
    </div>
  );
};

export default Card;
