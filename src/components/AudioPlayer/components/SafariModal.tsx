import React from "react";

interface SafariWarningModalProps {
  onClose: () => void;
}
const SafariModal: React.FC<SafariWarningModalProps> = ({ onClose }) => {
  // Function to open Chrome with the current link
  const openInChrome = () => {
    const currentUrl = window.location.href;
    const chromeUrl = `googlechrome://${currentUrl}`;
    window.location.href = chromeUrl; // Attempt to open in Chrome

    // Fallback in case Chrome doesn't open
    setTimeout(() => {
      window.location.href = currentUrl; // Reload the current page as fallback
    }, 500);
  };

  return (
    <div className="fixed  top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
      <div className="bg-white rounded-lg p-4 w-80 shadow-lg text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715; {/* Cross button icon */}
        </button>
        <div className="text-3xl mb-2">⚠️</div> {/* Warning icon */}
        <h2 className="text-lg font-semibold mb-2">Feature Unsupported</h2>
        <p className="text-sm mb-4">
          Unfortunately, <strong>Equlizer</strong> feature is not supported on
          Safari. Please use Chrome or another browser for the best experience.
        </p>
        <button
          onClick={openInChrome}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default SafariModal;
