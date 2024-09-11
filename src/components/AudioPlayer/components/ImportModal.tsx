import { playImport } from "@/redux/slice/music/musicActionSlice";
import { FaUpload } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

interface ImportModalProps {
  dragging: boolean;
  handleFileDrop: (event: any) => void;
  handleDragOver: (event: any) => void;
  handleDragLeave: (event: any) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileSelect: (file: File) => Promise<void>;
  dispatch: any;
}
const ImportModal: React.FC<ImportModalProps> = ({
  dispatch,
  dragging,
  handleDragLeave,
  handleDragOver,
  handleFileDrop,
  handleFileSelect,
  setShowModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div
        className={`relative bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md ${
          dragging ? "border-4 border-dashed border-accent" : ""
        }`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Close Icon */}
        <IoMdClose
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-xl sm:text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Import Audio
        </h2>
        <div className="flex items-center justify-center mb-4">
          {/* Input with Accent Border */}
          <label
            htmlFor="importAudio"
            className="flex flex-col items-center w-full px-4 py-10 border-dashed text-black hover:text-textPrimary border-accent rounded-lg shadow-lg tracking-wide uppercase border-2 hover:border-secondary transition-colors cursor-pointer"
          >
            <FaUpload className="text-xl sm:text-2xl mb-2" />
            <span className="text-sm md:text-base leading-normal">
              Select a file
            </span>
            {/* Hidden file input */}
            <input
              name="importAudio"
              type="file"
              id="importAudio"
              accept="audio/*"
              onChange={(e) => {
                e.target.files && handleFileSelect(e.target.files[0]);
                dispatch(playImport());
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
