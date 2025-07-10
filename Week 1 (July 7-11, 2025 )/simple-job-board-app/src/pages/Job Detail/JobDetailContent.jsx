import React from "react";
import { Link } from "react-router-dom";

const JobDetailContent = ({ job }) => {
  return (
    <div className="w-[100%] lg:pl-7 lg:pr-20 overflow-y-auto">
      <Link
        to="/"
        className="text-[#B03FE8] hover:text-[#9a35c6] mb-4 inline-block"
      >
        ← Back to Listings
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mt-4">{job.title}</h1>
      <p className="text-lg text-gray-600 mt-2">
        {job.company} - {job.location} - {job.type}
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">{job.description}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="bg-green-200 text-green-800 p-2 rounded-lg text-sm">
          <b>Salary:</b> {job.expectedSalary}
        </div>
        <div className="bg-blue-200 text-blue-800 p-2 rounded-lg text-sm">
          <b>Experience:</b> {job.experienceRequired}
        </div>
        <div className="bg-yellow-200 text-yellow-800 p-2 rounded-lg text-sm">
          <b>Skills:</b> {job.skillsNeeded.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default JobDetailContent;
