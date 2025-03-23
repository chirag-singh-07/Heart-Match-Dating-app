import React from "react";

const LoadingMessage = () => {
  return (
    <>
      {/* Left-aligned loading skeleton */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Right-aligned loading skeleton */}
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
        </div>
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
      </div>
      {/* Left-aligned loading skeleton */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Right-aligned loading skeleton */}
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
        </div>
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
      </div>
      {/* Left-aligned loading skeleton */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Right-aligned loading skeleton */}
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
        </div>
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
      </div>
      {/* Left-aligned loading skeleton */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
          <div className="w-40 h-4 bg-rose-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Right-aligned loading skeleton */}
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-pink-200 rounded animate-pulse"></div>
        </div>
        <div className="w-10 h-10 bg-rose-300 rounded-full animate-pulse shrink-0"></div>
      </div>
    </>
  );
};

export default LoadingMessage;
