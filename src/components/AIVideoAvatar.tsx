import React, { useState, useEffect } from 'react';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIVideoAvatar: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setError("The avatar is taking longer than expected to load. Please check your internet connection and try refreshing the page.");
      }
    }, 15000); // 15 seconds timeout

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setError(null);
  };

  const handleIframeError = () => {
    setError("Failed to load the avatar. Please try refreshing the page or check your internet connection.");
  };

  const handleRefresh = () => {
    setIsLoaded(false);
    setError(null);
    // Force iframe reload
    const iframe = document.getElementById('ai-avatar-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">AI Video Avatar</h1>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
          <p className="text-lg mb-4">
            Welcome to the AI Video Avatar page. The interactive avatar should appear below.
          </p>
          <p className="text-lg mb-4">
            You can interact with the avatar using your microphone. Make sure you've allowed microphone access in your browser settings for this feature to work properly.
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {!isLoaded && !error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-navy-blue"></div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-red-500 text-center mb-4">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="flex items-center bg-navy-blue text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
                >
                  <RefreshCw size={20} className="mr-2" />
                  Refresh Avatar
                </button>
              </div>
            )}
            <iframe
              id="ai-avatar-iframe"
              src="https://labs.heygen.com/interactive-avatar/share?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJlZjA4MDM5YTQxMzU0ZWQ1YTIwNTY1ZGI4%0D%0AOTkzNzNmMyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0AL2VmMDgwMzlhNDEzNTRlZDVhMjA1NjVkYjg5OTM3M2YzL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImRl%0D%0AbW8tMiIsInVzZXJuYW1lIjoiM2M0YmQ2ODNiODY5NDA2NDk2MDQxOTA2ZGI5NGM3ZDUifQ%3D%3D"
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen={true}
              allow="microphone"
              title="AI Video Avatar"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ display: isLoaded ? 'block' : 'none' }}
            ></iframe>
          </div>
          {isLoaded && (
            <p className="text-lg font-semibold mt-4 text-green-600">Avatar loaded successfully!</p>
          )}
          {!isLoaded && !error && (
            <p className="text-lg font-semibold mt-4 text-blue-600">Loading avatar... This may take a few moments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVideoAvatar;