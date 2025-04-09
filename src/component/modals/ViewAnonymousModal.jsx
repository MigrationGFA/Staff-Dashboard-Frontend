import { IoClose } from "react-icons/io5";
import { ButtonSmallPurple } from "../Buttons";
import { useNavigate } from "react-router-dom";

const ViewAnonymousModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-sec11">Anonymous Details</h2>
          <button onClick={onClose} className="text-primary5 hover:text-sec11">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="p-8">
          {/* Anonymous details Field */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">
              Anonymous details:
            </label>
            <textarea
              className="w-full rounded-lg focus:border-none focus:ring-primary11 h-16"
              placeholder="Briefly describe..."
            ></textarea>
          </div>

          {/* Hr Response Field */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">
              Hr Response:
            </label>
            <textarea
              className="w-full rounded-lg focus:border-none focus:ring-primary11 h-16"
              placeholder="Briefly describe..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between w-full">
            <ButtonSmallPurple
              padding=""
              width=""
              type="submit"
              className="py-3.5 px-6 rounded-lg place-self-end"
              onClick={() => navigate(-1)}
            >
              Close
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewAnonymousModal;
