import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "Full-time",
    location: "",
    description: "",
  });
  const [titleError, setTitleError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
    setTitleError("");
  };

  const handleCompanyChange = (e) => {
    setFormData({ ...formData, company: e.target.value });
    setCompanyError("");
  };

  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
    setLocationError("");
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    setDescriptionError("");
  };

  const handleTypeChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const validateForm = () => {
    let hasErrors = false;
    if (!formData.title.trim()) {
      setTitleError("Title is required");
      hasErrors = true;
    }
    if (!formData.company.trim()) {
      setCompanyError("Company is required");
      hasErrors = true;
    }
    if (!formData.location.trim()) {
      setLocationError("Location is required");
      hasErrors = true;
    }
    if (!formData.description.trim()) {
      setDescriptionError("Description is required");
      hasErrors = true;
    }
    return hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = validateForm();
    if (!hasErrors) {
      console.log("Form Data:", formData);

      setShowToast(true);
      setSubmitBtn("Submitted!");
      setTimeout(() => {
        setShowToast(false);
        setFormData({
          title: "",
          company: "",
          type: "Full-time",
          location: "",
          description: "",
        });
        setTitleError("");
        setCompanyError("");
        setLocationError("");
        setDescriptionError("");
        setSubmitBtn("Submit");
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-6">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg">
          Job posted successfully!
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Title"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              titleError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleCompanyChange}
            placeholder="Company"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              companyError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {companyError && (
            <p className="text-red-500 text-sm mt-1">{companyError}</p>
          )}
        </div>
        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-300`}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            placeholder="Location"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              locationError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {locationError && (
            <p className="text-red-500 text-sm mt-1">{locationError}</p>
          )}
        </div>
        <div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              descriptionError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {descriptionError && (
            <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
          )}
        </div>
        <div className="text-right">
          <button
            type="submit"
            className={`bg-[#B03FE8] text-white px-4 py-2 rounded-lg hover:bg-[#9a35c6] transition duration-300 ${
              submitBtn === "Submitted!"
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer"
            }`}
          >
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
