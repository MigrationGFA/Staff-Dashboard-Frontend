import { useEffect, useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { ButtonSmallPurple } from "../Buttons";
import AddTaskModal from "../modals/AddTaskModal";
import ViewTaskModal from "../modals/ViewTaskModal";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";

const TaskTable = ({ onTaskAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const fetchTasks = async () => {
    try {
      const response = await api.getTotalProject({
        accessToken,
        refreshToken,
        userId: user.userId,
      });

      const tasksFromResponse = response.result.tasksAssignedToUser.map(
        (task) => ({
          id: task._id,
          name: task.name,
          assignedBy: task.assignedBy,
          assignedTo: task.assignedTo,
          startDate: new Date(task.startingDate).toLocaleDateString(),
          endDate: new Date(task.endDate).toLocaleDateString(),
          description: task.shortDescription,
          status: task.status,
        })
      );

      setTasks(tasksFromResponse);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [accessToken, refreshToken]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">TASKS</h2>
        <ButtonSmallPurple
          className="flex items-center text-white px-4 py-2.5 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" /> Add Task
        </ButtonSmallPurple>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full lg:w-1/3 p-2 border rounded-lg"
        />
        <ButtonSmallPurple className="flex items-center px-4 py-2.5 rounded-lg">
          <FaFilter className="mr-2" /> Filter
        </ButtonSmallPurple>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">NAME</th>
              <th className="p-3">ASSIGNED BY</th>
              <th className="p-3">ASSIGNED TO</th>
              <th className="p-3">START DATE</th>
              <th className="p-3">END DATE</th>
              <th className="p-3">DESCRIPTION</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id} className="border-t text-gray-700">
                <td className="p-3">{task.name}</td>
                <td className="p-3">{task.assignedBy}</td>
                <td className="p-3">{task.assignedTo}</td>
                <td className="p-3">{task.startDate}</td>
                <td className="p-3">{task.endDate}</td>
                <td className="p-3">{task.description}</td>
                <td className="p-3 italic">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      task.status === "pending"
                        ? "bg-yellow-300 text-yellow-800"
                        : "bg-green-300 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-3">
                  <ButtonSmallPurple
                    className="px-4 py-1 rounded-lg"
                    onClick={() => {
                      setSelectedTaskId(task.id);
                      setIsEditModalOpen(true);
                      console.log("task id check:", task.id);
                    }}
                  >
                    View
                  </ButtonSmallPurple>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {Math.ceil(tasks.length / tasksPerPage)}
        </div>

        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300" : "bg-primary11 text-white"
            }`}
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(tasks.length / tasksPerPage))
              )
            }
            disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(tasks.length / tasksPerPage)
                ? "bg-gray-300"
                : "bg-primary11 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={() => {
            fetchTasks();
            onTaskAdded?.();
            setIsModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && (
        <ViewTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          id={selectedTaskId}
        />
      )}
    </div>
  );
};

export default TaskTable;
