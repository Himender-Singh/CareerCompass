import { faLightbulb, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import img from "../../assets/bg1.svg";
import Card from "./Card"; // Import the Card component
import { useSelector } from "react-redux";
import useGetSuggestedUser from "@/hooks/useGetSuggestedUser";

const Search = () => {
  // Fetch suggested users
  const { suggestedUsers } = useGetSuggestedUser() || { suggestedUsers: [] }; // Ensure suggestedUsers is an array
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // Optional chaining to prevent errors
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    experience: "",
    ratings: "",
    sessions: "",
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter suggested users based on search term and filters
  const filteredUsers = suggestedUsers.filter((user) => {
    // Filter by search term
    const matchesSearchTerm =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter by experience
    const matchesExperience = filters.experience
      ? user.experience >= parseInt(filters.experience)
      : true;

    // Filter by ratings
    const matchesRatings = filters.ratings
      ? parseFloat(user.ratings) >= parseFloat(filters.ratings)
      : true;

    // Filter by sessions
    const matchesSessions = filters.sessions
      ? user.sessions >= parseInt(filters.sessions)
      : true;

    return (
      matchesSearchTerm &&
      matchesExperience &&
      matchesRatings &&
      matchesSessions
    );
  });

  return (
    <div
      className="relative w-full bg-[#020617]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Heading */}
      <div className="relative max-w-screen-lg sm:text-center mx-auto z-10 text-white pt-10 px-4">
        <h2 className="text-2xl font-bold mb-4 sm:text-4xl md:text-5xl">
        Search for Instructor
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">
        Unlock personalized career opportunities with our AI-driven smart
          search, tailored to match your unique skills and aspirations. Discover
          relevant profiles and mentorship options effortlessly, enhancing your
          journey toward success!
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center justify-center pt-14 sm:pt-20">
        <div className="relative w-full max-w-screen-lg">
          <input
            type="text"
            className="w-full pl-12 pr-16 py-3 sm:py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder='Try "I want a roadmap for Data Science..."'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Search Button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button className="flex items-center justify-center w-28 sm:w-32 h-10 sm:h-12 bg-blue-500 text-white rounded-full">
              <FontAwesomeIcon icon={faSearch} />
              <span className="pl-2 sm:pl-3">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar and Filters Section */}
      <div className="flex flex-col p-4 sm:flex-row justify-between items-start pt-10 sm:pt-12 mx-auto max-w-screen-lg relative z-10">
        {/* Cards Section */}
        <div className="flex flex-wrap justify-start items-start w-full sm:w-3/4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <Card
                key={user._id || index} // Use user ID as key if available
                title={user.username}
                content={user.bio}
                author={user.username}
                role={user.role} // Pass the role prop
                experience={`${user.experience} years of experience`}
                ratings={`${user.ratings} Ratings`}
                sessions={`${user.sessions} Sessions`}
                skills={user.skills}
                userImage={user.profilePicture} // Make sure this points to a valid image URL
                userId={user._id}
              />
            ))
          ) : (
            <p className="text-white">No matching users found.</p>
          )}
        </div>

        {/* Filters Section (Visible only on medium and larger screens) */}
        <div className="bg-white hidden sm:block sticky top-10 rounded-lg p-4 shadow-lg w-full sm:w-80 ml-0 sm:ml-4 mt-4 sm:mt-0">
          <h3 className="text-lg font-semibold mb-2">Filter</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium">Sessions</label>
              <input
                type="text"
                name="sessions"
                value={filters.sessions}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded w-full p-2"
                placeholder="e.g. 158 Sessions"
              />
            </div>
            <button className="mt-4 bg-blue-500 text-white rounded py-2">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
