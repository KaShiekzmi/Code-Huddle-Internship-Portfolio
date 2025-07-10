import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-lg p-4 h-46 flex flex-col justify-between cursor-pointer overflow-hidden hover:scale-101 transition-all duration-300 ease-in-out hover:shadow-2xl"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{job.type}</p>
        <p className="text-sm text-gray-500 mt-1">
          {job.company} - {job.location}
        </p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3 flex-1">
          {job.description}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
