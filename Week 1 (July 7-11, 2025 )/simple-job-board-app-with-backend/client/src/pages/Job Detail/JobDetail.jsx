import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import JobDetailContent from "./JobDetailContent";
import LoadingSpinner from "../../components/LoadingSpinner";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/job`);
        const data = await response.json();
        const foundJob = data.find((job) => job.id === parseInt(id));
        setJob(foundJob);
        setJobs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [id]);

  return (
    <div className="container mx-auto w-[100%] p-6 flex ">
      <Sidebar jobs={jobs} />
      <div className="w-[100%] lg:pl-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : !job ? (
          <div className="text-center min-h-110 mt-8">
            Oops! It seems no job is available with ID: {id}. 🫠
          </div>
        ) : (
          <JobDetailContent job={job} />
        )}
      </div>
    </div>
  );
};

export default JobDetail;
