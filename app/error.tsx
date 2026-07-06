"use client"

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grow flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-sm w-full flex flex-col items-center gap-4">
        {/* Warning Icon */}
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold">
          ⚠
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-800">Something went wrong!</h1>
          <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
            An unexpected error occurred. Please try reloading or head back to home.
          </p>
        </div>
        
        <div className="flex gap-2 w-full mt-2">
          <button
            onClick={() => reset()}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded text-xs transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded text-xs transition block text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
