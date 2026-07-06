import React from "react";

export default function Loading() {
  return (
    <div className="grow flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      {/* DaisyUI Loading Bars Spinner */}
      <span className="loading loading-bars loading-xl text-blue-600"></span>
      <p className="text-gray-500 text-xs sm:text-sm font-medium mt-4">
        Loading, please wait...
      </p>
    </div>
  );
}
