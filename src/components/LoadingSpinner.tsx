const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="bg-blue-500 text-white p-4 rounded z-100">
        <span className="loading loading-dots loading-lg z-100"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
