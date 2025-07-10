import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "Full-time",
    location: "",
    description: "",
    expectedSalary: "",
    experienceRequired: "",
    skillsNeeded: [],
  });
  const [titleError, setTitleError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [skillsError, setSkillsError] = useState("");
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
    setTypeError("");
  };

  const handleSalaryChange = (e) => {
    setFormData({ ...formData, expectedSalary: e.target.value });
    setSalaryError("");
  };

  const handleExperienceChange = (e) => {
    setFormData({ ...formData, experienceRequired: e.target.value });
    setExperienceError("");
  };

  const addSkill = (e) => {
    e.preventDefault();
    const skillInput = document.querySelector('input[name="skill"]');
    if (skillInput.value.trim()) {
      setFormData({
        ...formData,
        skillsNeeded: [...formData.skillsNeeded, skillInput.value.trim()],
      });
      setSkillsError("");
      skillInput.value = "";
    }
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
    if (!formData.type) {
      setTypeError("Job type is required");
      hasErrors = true;
    }
    if (!formData.expectedSalary) {
      setSalaryError("Salary range is required");
      hasErrors = true;
    }
    if (!formData.experienceRequired) {
      setExperienceError("Experience range is required");
      hasErrors = true;
    }
    if (formData.skillsNeeded.length === 0) {
      setSkillsError("At least one skill is required");
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
          expectedSalary: "",
          experienceRequired: "",
          skillsNeeded: [],
        });
        setTitleError("");
        setCompanyError("");
        setLocationError("");
        setDescriptionError("");
        setTypeError("");
        setSalaryError("");
        setExperienceError("");
        setSkillsError("");
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              typeError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
          </select>
          {typeError && (
            <p className="text-red-500 text-sm mt-1">{typeError}</p>
          )}
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
        <div>
          <input
            type="text"
            name="skill"
            placeholder="Add a skill"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              skillsError ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex justify-between flex-row-reverse">
            <button
              onClick={addSkill}
              className="mt-2 bg-[#B03FE8] text-white px-4 py-2 rounded-lg hover:bg-[#9a35c6] transition duration-300 cursor-pointer"
            >
              Add Skill
            </button>
            {skillsError && (
              <p className="text-red-500 text-sm mt-1">{skillsError}</p>
            )}
          </div>
          {formData.skillsNeeded.length > 0 && (
            <p className="mt-3 bg-purple-200 text-gray-700 p-2 rounded-lg text-sm">
              <b>Skills:</b> {formData.skillsNeeded.join(", ") || "None"}
            </p>
          )}
        </div>
        <div>
          <select
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleSalaryChange}
            className={`cursor-pointer w-full px-4 py-2 border rounded-lg focus:outline-none ${
              salaryError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Salary Range</option>
            <option value="PKR 0 - 50,000/month">PKR 0 - 50,000/month</option>
            <option value="PKR 50,000 - 100,000/month">
              PKR 50,000 - 100,000/month
            </option>
            <option value="PKR 100,000 - 150,000/month">
              PKR 100,000 - 150,000/month
            </option>
            <option value="PKR 150,000 - 200,000/month">
              PKR 150,000 - 200,000/month
            </option>
            <option value="PKR 200,000+/month">PKR 200,000+/month</option>
          </select>
          {salaryError && (
            <p className="text-red-500 text-sm mt-1">{salaryError}</p>
          )}
        </div>
        <div>
          <select
            name="experienceRequired"
            value={formData.experienceRequired}
            onChange={handleExperienceChange}
            className={`cursor-pointer w-full px-4 py-2 border rounded-lg focus:outline-none ${
              experienceError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Experience Range</option>
            <option value="0-1 year">0-1 year</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
          {experienceError && (
            <p className="text-red-500 text-sm mt-1">{experienceError}</p>
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
