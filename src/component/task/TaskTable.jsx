import { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { ButtonSmallPurple } from "../Buttons";
import AddTaskModal from "../modals/AddTaskModal";
import ViewTaskModal from "../modals/ViewTaskModal";

const TaskTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Design 1",
      assigned: "Mr Debo",
      priority: "High",
      startDate: "22/02/2024",
      endDate: "12/01/2025",
      description: "Landing page...",
      status: "Approved",
    },
    {
      id: 2,
      name: "Design 2",
      assigned: "Mr Sam",
      priority: "Medium",
      startDate: "22/02/2025",
      endDate: "12/01/2025",
      description: "Edit screen...",
      status: "In progress",
    },
    {
      id: 3,
      name: "Design 3",
      assigned: "Mr Azeez",
      priority: "Low",
      startDate: "22/02/2025",
      endDate: "12/01/2025",
      description: "Pop-up screen...",
      status: "Completed",
    },
  ]);

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
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">NAME</th>
              <th className="p-3">ASSIGNED BY</th>
              <th className="p-3">PRIORITY</th>
              <th className="p-3">START DATE</th>
              <th className="p-3">END DATE</th>
              <th className="p-3">DESCRIPTION</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t text-gray-700">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">{task.name}</td>
                <td className="p-3">{task.assigned}</td>
                <td className="p-3">
                  <select
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      task.priority === "High"
                        ? "bg-pink-100 text-pink-600"
                        : task.priority === "Medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <option>{task.priority}</option>
                  </select>
                </td>
                <td className="p-3">{task.startDate}</td>
                <td className="p-3">{task.endDate}</td>
                <td className="p-3">{task.description}</td>
                <td className="p-3">
                  <select className="px-3 py-1 rounded-lg text-sm font-semibold">
                    <option>{task.status}</option>
                  </select>
                </td>
                <td className="p-3">
                  <ButtonSmallPurple
                    className="px-4 py-1 rounded-lg"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    View
                  </ButtonSmallPurple>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ViewTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default TaskTable;
