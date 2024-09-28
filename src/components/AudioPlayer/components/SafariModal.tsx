import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { toast } from "sonner";
interface SafariWarningModalProps {
  onClose: () => void;
}

const SafariWarningModal: React.FC<SafariWarningModalProps> = ({ onClose }) => {
  const [codeToCopy] = useState(window.location.href); // Replace with your actual code

  // Function to copy code to clipboard
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        toast.success("Link copied."); // Optionally show a success message
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
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
          Unfortunately, <strong>Equalizer</strong> feature is not supported on
          Safari. Please use Chrome or another browser for the best experience.
        </p>
        {/* Input field for code */}
        <div className="flex">
          <input
            type="text"
            value={codeToCopy}
            readOnly
            className="border rounded-l px-2 py-1 mb-2 w-full"
          />
          {/* Copy button */}
          <button
            onClick={handleCopyClick}
            className="bg-primary text-white px-4 py-2 rounded-r mb-2"
          >
            <IoMdCopy />
          </button>
        </div>
        {/* Okay button */}
        <a
          href="https://apps.apple.com/us/app/google-chrome/id535886823"
          target="_blank"
        >
          <button
            // onClick={onClose}
            className="bg-primary text-white px-4 mt-2 py-2 rounded"
          >
            Okay
          </button>
        </a>
      </div>
    </div>
  );
};

export default SafariWarningModal;
