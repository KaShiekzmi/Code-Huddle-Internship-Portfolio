import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = ({ jobs }) => {
  const jobTypes = ["All", "Full-time", "Part-time", "Remote"];
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredJobs =
    jobs.length > 0
      ? selectedFilter === "All"
        ? jobs
        : jobs.filter((job) => job.type === selectedFilter)
      : [];

  return (
    <div
      className="w-1/4 hidden lg:block pr-6 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 120px)", minHeight: "300px" }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Filters</h2>
        {jobTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedFilter(type)}
            className={`px-4 py-1 rounded-full w-full text-left mb-2 cursor-pointer ${
              selectedFilter === type
                ? "bg-[#B03FE8] text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-[#9a35c6] hover:text-white transition duration-300`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">All Jobs</h2>
        {filteredJobs.length > 0 ? (
          <>
            {filteredJobs.map((jobItem) => (
              <div
                key={jobItem.id}
                className={`   bg-white border-2 rounded-lg p-3 h-auto flex flex-col justify-between cursor-pointer shadow-md hover:shadow-lg hover:pl-4 transition-all duration-300 mb-2 ${
                  parseInt(id) === jobItem.id
                    ? "border-[#B03FE8] border-[2px]"
                    : "border-gray-200"
                }`}
                onClick={() => navigate(`/job/${jobItem.id}`)}
              >
                <h3 className="text-md font-semibold text-gray-800 mb-0">
                  {jobItem.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {jobItem.company} - {jobItem.location}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-600 text-md">No jobs Available!</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
