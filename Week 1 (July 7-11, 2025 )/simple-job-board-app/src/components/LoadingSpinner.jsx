import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="w-12 h-12 border-4 border-t-[#B03FE8] border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
