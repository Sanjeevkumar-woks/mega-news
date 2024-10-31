const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-gray-800">
      {/* Spinning circle */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-t-4 border-gray-500 animate-spin"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-red-500 animate-pulse">
          404
        </h1>
      </div>
      {/* Text content */}
      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        Oops! It seems the page you’re looking for doesn’t exist.
      </p>
    </div>
  );
};

export default PageNotFound;
