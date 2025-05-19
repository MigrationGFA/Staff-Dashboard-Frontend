import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import api from "../../api/dashboardApi"; // Import your API utility
import { showToast } from "../ShowToast"; // Import your toast utility
import { useSelector } from "react-redux";

const HelpCenterMessageForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reason: "",
    message: "",
  });

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth?.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.submitHelpCenterMessage({
        accessToken,
        refreshToken,
        formData,
        userId: user?.userId,
        department: user?.department,
      });
      showToast(response);
      navigate(-1); // Navigate back after successful submission
    } catch (error) {
      console.error("Error submitting help center message:", error);
    }
  };

  return (
    <form className="p-3 lg:p-8" onSubmit={handleSubmit}>
      {/* Reason Selection */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Reason</label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full rounded-lg focus:ring-primary11"
        >
          <option value="">-- Select Option --</option>
          <option value="Dispute">Dispute</option>
          <option value="Maltreatment">Maltreatment</option>
          <option value="Suggestion">Suggestion</option>
        </select>
      </div>

      {/* Suggestions Field */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">
          How can we help?
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg focus:ring-primary11 h-28"
          placeholder="Briefly describe..."
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <ButtonSmallWhite
          padding=""
          width=""
          type="button"
          className="py-3.5 px-6 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Return
        </ButtonSmallWhite>
        <ButtonSmallPurple
          padding=""
          width=""
          type="submit"
          className="py-3.5 px-6 rounded-lg"
        >
          Submit
        </ButtonSmallPurple>
      </div>
    </form>
  );
};

export default HelpCenterMessageForm;
