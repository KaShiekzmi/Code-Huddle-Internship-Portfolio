import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/job`);
        const data = await response.json();
        setJobs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const JobTypes = ["All", "Full-time", "Part-time", "Remote"];

  const filteredJobs =
    selectedFilter === "All"
      ? jobs
      : jobs.filter((job) => job.type === selectedFilter);

  return (
    <div className="container mx-auto py-5 px-4 sm:px-7">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Avaliable Job Listings - {selectedFilter}
          </h1>
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {JobTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`px-4 py-1 rounded-full ${
                  selectedFilter === type
                    ? "bg-[#B03FE8] text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-[#9a35c6] hover:text-white transition duration-300 cursor-pointer w-full sm:w-auto`}
              >
                {type}
              </button>
            ))}
          </div>
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-h-66">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-66">
              <p className="text-gray-600 text-lg">
                Oohoo... No jobs Avaliable! 🫠
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobListings;
