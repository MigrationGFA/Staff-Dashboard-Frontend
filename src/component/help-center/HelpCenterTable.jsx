import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaPlus } from "react-icons/fa";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import ViewHelpCenterModal from "../modals/ViewHelpCenterModal";

const HelpCenterTable = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");

  const messages = [
    {
      id: 1,
      date: "22/02/2024",
      reason: "Reason 1",
      message: "Can't access my...",
      status: "Pending",
    },
    {
      id: 2,
      date: "22/02/2025",
      reason: "Reason 2",
      message: "Forgot my pass...",
      status: "Completed",
    },
  ];

  const filteredMessages =
    selectedTab === "All"
      ? messages
      : messages.filter((msg) => msg.status === selectedTab);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 font-medium";
      case "Pending":
        return "text-yellow-600 font-medium";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-5 border rounded-lg shadow-lg mb-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sec11 uppercase">Help Center</h2>
        <ButtonSmallPurple
          onClick={() => navigate("/help-center-form")}
          className="flex items-center text-white px-4 py-2.5 rounded-lg"
        >
          <FaPlus className="mr-2" /> Create Ticket
        </ButtonSmallPurple>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4 space-x-6 text-gray-600">
        {["All", "Pending", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`pb-2 text-sm font-medium ${
              selectedTab === tab
                ? "border-b-2 border-purple-600 text-black"
                : ""
            }`}
          >
            {tab} Messages
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full lg:w-1/3 border rounded-lg p-2 focus:ring-purple-600"
        />
        <ButtonSmallPurple className="flex items-center border px-4 py-2.5 rounded-lg">
          <FaFilter className="mr-2" /> Filter
        </ButtonSmallPurple>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-sec11">
              <th className="p-3">S/NO</th>
              <th className="p-3">DATE</th>
              <th className="p-3">REASON</th>
              <th className="p-3">MESSAGE</th>
              <th className="p-3">STATUS</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg, index) => (
              <tr key={msg.id} className="border-t text-sec11">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{msg.date}</td>
                <td className="p-3">{msg.reason}</td>
                <td className="p-3">{msg.message}</td>
                <td className={`p-3 ${getStatusClass(msg.status)}`}>
                  {msg.status}
                </td>
                <td className="p-3">
                  <ButtonSmallWhite
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-1 border rounded-lg"
                  >
                    View
                  </ButtonSmallWhite>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ViewHelpCenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HelpCenterTable;
