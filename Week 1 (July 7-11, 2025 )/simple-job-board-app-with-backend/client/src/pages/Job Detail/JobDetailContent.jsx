import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JobDetailContent = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const [delBtnText, setDelBtnText] = useState("Yes, Delete it!");
  const [showSuccToast, setShowSuccToast] = useState(false);
  const [showErrToast, setShowErrToast] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDelBtnText("Deleting...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/job/${job.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setShowSuccToast(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setShowErrToast(true);
        console.error("Failed to delete job");
      }
    } catch (error) {
      setShowErrToast(true);
      console.error("Error deleting job:", error);
    } finally {
      setDelBtnText("Yes, Delete it!");
      setShowModal(false);
      setTimeout(() => {
        setShowSuccToast(false);
        setShowErrToast(false);
      }, 3000);
    }
  };

  return (
    <div className="w-[100%] lg:pl-7 lg:pr-20 overflow-y-auto">
      {showSuccToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg">
          Job Deleted successfully!
        </div>
      )}
      {showErrToast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded shadow-lg">
          Error while deleting Job
        </div>
      )}
      <Link
        to="/"
        className="text-[#B03FE8] hover:text-[#9a35c6] mb-4 inline-block"
      >
        ← Back to Listings
      </Link>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-gray-800 mt-4">{job.title}</h1>
        <span>
          <i
            className="cursor-pointer text-purple-600 fas fa-trash hover:text-purple-700"
            onClick={() => setShowModal(true)}
          ></i>
        </span>
      </div>
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
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <b>{job.title}</b> job?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer bg-gray-200 text-gray-800 px-2 py-1 rounded-lg hover:opacity-90 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={` bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition duration-300 ${
                  delBtnText === "Deleting..."
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
              >
                {delBtnText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailContent;
