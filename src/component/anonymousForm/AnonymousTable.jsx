import { useState, useEffect } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import { useNavigate } from "react-router-dom";
import ViewAnonymousModal from "../modals/ViewAnonymousModal";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateHelper";

const AnonymousTable = ({ onAdded }) => {
  const [isAnonymousModalOpen, setIsAnonymousModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.getSuggestionByDept({
          accessToken,
          refreshToken,
          department: user.department,
        });
        setMessages(response.suggestions);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sec11 uppercase">
          Anonymous MESSAGES
        </h2>
        <ButtonSmallPurple
          padding=""
          width=""
          height=""
          className="flex items-center text-white px-4 py-2.5 rounded-lg transition"
          onClick={() => {
            navigate("/anonymous-form");
            onAdded?.();
          }}
        >
          <FaPlus className="mr-2" /> Add Message
        </ButtonSmallPurple>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full lg:w-1/3 rounded-lg focus:ring-primary11"
        />
        <ButtonSmallPurple
          padding=""
          width=""
          height=""
          className="flex items-center border px-4 py-2.5 rounded-lg"
        >
          <FaFilter className="mr-2" /> Filter
        </ButtonSmallPurple>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-sec11 whitespace-nowrap">
              <th className="p-3">ANONYMOUS TITLE</th>
              <th className="p-3">DEPARTMENT</th>
              <th className="p-3">DATE</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentMessages?.map((message) => (
              <tr key={message._id} className="border-t text-sec11">
                <td className="p-3">{message.reason}</td>
                <td className="p-3">{message.department}</td>
                <td className="p-3">{formatDate(message.createdAt)}</td>

                <td className="p-3 space-y-2 lg:space-y-0 lg:space-x-2">
                  <ButtonSmallWhite
                    padding=""
                    width=""
                    height=""
                    className="px-7 lg:px-4 py-1 rounded-lg h-auto"
                    onClick={() => {
                      setSelectedMessage(message);
                      setIsAnonymousModalOpen(true);
                    }}
                  >
                    View
                  </ButtonSmallWhite>
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

      {/* View Anonymous Modal */}
      <ViewAnonymousModal
        isOpen={isAnonymousModalOpen}
        onClose={() => {
          setIsAnonymousModalOpen(false);
          setSelectedMessage(null);
        }}
        message={selectedMessage}
      />
    </div>
  );
};

export default AnonymousTable;
