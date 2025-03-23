import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
              index + 1 <= currentStep
                ? "bg-rose-500 text-white shadow-lg"
                : "border border-rose-300 bg-rose-100 text-rose-500"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-rose-200">
        <div
          className="absolute left-0 top-0 h-full bg-rose-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-rose-500">
        <span>Basic Info</span>
        <span>Profile</span>
        <span>Personal Details</span>
      </div>
    </div>
  );
};

export default ProgressBar;
