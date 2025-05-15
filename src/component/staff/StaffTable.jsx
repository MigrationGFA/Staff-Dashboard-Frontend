import { FaPlus } from "react-icons/fa";
import { ButtonSmallPurple } from "../Buttons";
import { useEffect, useState } from "react";
import AddStaffModal from "../modals/AddStaffModal";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";

const StaffTable = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staff, setStaff] = useState([]);

  const fetchStaffData = async () => {
    try {
      const response = await api.getStaffDetails({
        accessToken,
        refreshToken,
        department: user?.department,
      });
      setStaff(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [accessToken, refreshToken]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-red-100 text-red-600";
      case "In Progress":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-5 border rounded-lg shadow-lg mb-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-sec11">STAFF</h2>
        {/* Search & Filter */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="rounded-lg focus:ring-primary11"
          />
          <ButtonSmallPurple
            padding=""
            width=""
            height=""
            className="flex items-center text-white px-4 py-2.5 rounded-lg transition whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2" /> Add Staff
          </ButtonSmallPurple>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-sec11 whitespace-nowrap">
              <th className="p-3">STAFF NAME</th>
              <th className="p-3">ROLE</th>
              <th className="p-3">CONTRACT TYPE</th>
              <th className="p-3">DATE OF RESUMPTION</th>
              <th className="p-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {staff?.map((task) => (
              <tr key={task.id} className="border-t text-sec11">
                <td className="p-3">{task.name}</td>
                <td className="p-3">{task.assigned}</td>
                <td className="p-3">{task.duration}</td>
                <td className="p-3">{task.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusClass(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StaffTable;
