import { IoClose } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";

const ViewTaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2 text-purple-600">
            <MdNoteAdd size={30}/>
            <div>
              <h2 className="text-lg font-semibold">Task</h2>
              <p className="text-xs text-gray-500">Manage all tasks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Task Details */}
        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Task Name:</span>{" "}
            <span className="ml-2">Design 1</span>
          </p>
          <p>
            <span className="font-semibold">Assigned By:</span>{" "}
            <span className="ml-2">Samuel Bashir</span>
          </p>
          <p>
            <span className="font-semibold">Duration:</span>{" "}
            <span className="ml-2 font-medium text-purple-600">2 weeks</span>
          </p>
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            <span className="ml-2">22/00/0000</span>
          </p>
          <p>
            <span className="font-semibold">End Date:</span>{" "}
            <span className="ml-2">22/01/2026</span>
          </p>
          <p>
            <span className="font-semibold">Date of Resumption:</span>{" "}
            <span className="ml-2">01/01/2025</span>
          </p>

          {/* Description */}
          <div className="mt-3">
            <label className="block text-gray-600 text-sm font-semibold">
              Description
            </label>
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 cursor-not-allowed"
              placeholder="Briefly describe..."
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
