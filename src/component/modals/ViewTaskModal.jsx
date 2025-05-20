import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";

const ViewTaskModal = ({ isOpen, onClose, id }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [viewDetails, setViewDetails] = useState([]);

  const fetchViewDetails = async () => {
    try {
      const response = await api.getTaskDetails({
        accessToken,
        refreshToken,
        taskId: id,
      });
      setViewDetails(response.result);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const markTaskInProgress = async () => {
    try {
      const response = await api.updateTaskStatus({
        accessToken,
        refreshToken,
        taskId: id,
        status: "in-progress",
      });
      showToast(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const markTaskCompleted = async () => {
    try {
      const response = await api.updateTaskStatus({
        accessToken,
        refreshToken,
        taskId: id,
        status: "complete",
      });
      showToast(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchViewDetails();
  }, [accessToken, refreshToken, id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatPriority = (priority) => {
    if (!priority) return "N/A";
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b space-x-2 pb-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            My Task Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="border-b flex items-center space-x-2 py-2">
            <span className="font-semibold">Task Name:</span>
            <div className="mt-1">{viewDetails?.name || "N/A"}</div>
          </div>
          <div className="border-b flex items-center space-x-2 py-2">
            <span className="font-semibold">Assigned By:</span>
            <div className="mt-1">{viewDetails?.assignedBy || "N/A"}</div>
          </div>
          <div className="border-b flex items-center space-x-2 py-2">
            <span className="font-semibold">Duration:</span>
            <div className="mt-1">
              {formatPriority(viewDetails?.duration) || "N/A"}
            </div>
          </div>
          <div className="border-b flex items-center space-x-2 py-2">
            <span className="font-semibold">Start Date:</span>
            <div className="mt-1">{formatDate(viewDetails?.startingDate)}</div>
          </div>
          <div className="border-b flex items-center space-x-2 py-2">
            <span className="font-semibold">End Date:</span>
            <div className="mt-1">{formatDate(viewDetails?.endDate)}</div>
          </div>

          {/* Description */}
          <div className="col-span-2 mt-4 border-b py-2">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 cursor-not-allowed"
              placeholder="Briefly describe..."
              value={viewDetails?.shortDescription || ""}
              disabled
            />
          </div>

          {/* Feedback */}
          {/* <div className="col-span-2 mt-4 border-b py-2">
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Feedback
            </label>
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-lg text-gray-500 bg-gray-50"
              placeholder="Type here..."
              // value={feedback}
              // onChange={(e) => setFeedback(e.target.value)}
            />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-start gap-2">
          <button
            onClick={markTaskInProgress}
            className="bg-purple-100 text-purple-700 font-semibold rounded-full px-4 py-2 text-sm hover:bg-purple-200 focus:outline-none"
          >
            In Progress
          </button>
          <button
            onClick={markTaskCompleted}
            className="bg-purple-600 text-white font-semibold rounded-full px-4 py-2 text-sm hover:bg-purple-700 focus:outline-none"
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
