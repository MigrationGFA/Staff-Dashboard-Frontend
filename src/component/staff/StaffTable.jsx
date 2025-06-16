import { FaPlus } from "react-icons/fa";
import { ButtonSmallPurple } from "../Buttons";
import { useEffect, useState } from "react";
import AddStaffModal from "../modals/AddStaffModal";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { formatDate } from "../../utils/dateHelper";

const StaffTable = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchStaffData = async () => {
    try {
      const response = await api.getStaffDetails({
        accessToken,
        refreshToken,
        department: user?.department,
      });
      setStaff(response?.data);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [accessToken, refreshToken]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = staff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(staff.length / itemsPerPage);

  const getStatusClass = (status) => {
    switch (status) {
      case true:
        return "bg-green-100 text-green-600";
      case false:
        return "bg-yellow-100 text-yellow-600";
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
          {/* <ButtonSmallPurple
            padding=""
            width=""
            height=""
            className="flex items-center text-white px-4 py-2.5 rounded-lg transition whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2" /> Add Staff
          </ButtonSmallPurple> */}
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
            {staff.length > 0 &&
              currentStaff?.map((staff) => (
                <tr key={staff.id} className="border-t text-sec11">
                  <td className="p-3">{staff.profile?.fullName}</td>
                  <td className="p-3">{staff.role}</td>
                  <td className="p-3">{staff.contractType}</td>
                  <td className="p-3">{formatDate(staff.dateOfResumption)}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusClass(
                        staff.isProfileCreated
                      )}`}
                    >
                      {staff.isProfileCreated ? "Active" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>

        <div className="space-x-2 cursor-pointer">
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
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-primary11 text-white"
            }`}
          >
            Next
          </button>
        </div>
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
