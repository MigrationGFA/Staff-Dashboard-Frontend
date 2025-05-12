import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../ShowToast";

const AddTaskModal = ({ isOpen, onClose }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedBy, setAssignedBy] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    assignedBy: "",
    assignedTo: "",
    duration: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchAssignTo = async () => {
    try {
      const response = await api.getTaskAssignee({
        accessToken,
        refreshToken,
        userEmail: user.email,
      });
      setAssignedTo(Array.isArray(response) ? response : [response]);
      setAssignedBy(Array.isArray(response) ? response : [response]);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchAssignBy = async () => {
  //   try {
  //     const response = await api.getTaskAssigner({
  //       accessToken,
  //       refreshToken,
  //       userId: user.userId,
  //     });
  //     setAssignedBy(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchAssignTo();
    // fetchAssignBy();
  }, [accessToken, refreshToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.addTask({
        accessToken,
        refreshToken,
        userId: user.userId,
        formData,
      });
      showToast(response?.message);
      // onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-max-4xl rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-sec11">Add Task</h2>
          <button onClick={onClose} className="text-primary5 hover:text-sec11">
            <IoClose size={24} />
          </button>
        </div>

        <p className="text-primary5 text-sm mt-2">Kindly enter the details</p>

        {/* Form */}
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center gap-3">
            <div>
              <label className="block text-gray-600">Task Name</label>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11"
                placeholder="Task name"
              />
            </div>

            <div>
              <label className="block text-gray-600">Assigned By</label>
              <select
                name="assignedBy"
                value={formData.assignedBy}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11"
              >
                <option value="">-- Select Option --</option>
                {assignedBy?.map((option) => (
                  <option
                    key={option.reportingOfficerId}
                    value={option.reportingOfficerId}
                  >
                    {option?.reportingOfficerName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Assigned To</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11"
              >
                <option value="">-- Select Option --</option>
                {assignedTo?.map((option) => (
                  <option
                    key={option.reportingOfficerId}
                    value={option.reportingOfficerId}
                  >
                    {option?.reportingOfficerName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11"
                placeholder="Duration"
              />
            </div>

            <div>
              <label className="block text-gray-600">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11"
              />
            </div>

            <div>
              <label className="block text-gray-600">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-600">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-lg focus:border-primary11 h-24"
                placeholder="Reason for the task"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <ButtonSmallWhite
              width=""
              padding=""
              type="button"
              className="px-4 py-2 rounded-lg transition h-auto"
            >
              Edit
            </ButtonSmallWhite>
            <ButtonSmallPurple
              width=""
              padding=""
              height=""
              type="submit"
              className="px-4 py-2 rounded-lg transition h-auto"
            >
              Save
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
