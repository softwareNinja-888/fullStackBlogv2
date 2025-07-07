import { useState, useEffect } from 'react';

export const SuccessToast = ({ message = "Success!", showProgressBar = true, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the progress animation
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (100 / (duration / 100));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    // Set timeout to hide the toast after duration
    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Cleanup on unmount
    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    
    <div className="fixed top-4 right-4 min-w-44 bg-white shadow-lg rounded-md overflow-hidden p-4 z-150 flex flex-col">
      <div className="flex items-center mb-2">
        <div className="mr-2 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
      
      {showProgressBar && (
        <div className="h-1 w-full bg-gray-200 mt-2">
          <div 
            className="h-full bg-green-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};