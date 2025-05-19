import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";

const AnonymousMessageForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reason: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.submitAnonymousMessage({
        accessToken,
        refreshToken,
        formData,
      });
      showToast(response.message);
      setFormData({ reason: "", message: "" });
      navigate(-1);
    } catch (error) {
      console.error("Error submitting anonymous message:", error);
      showToast("Failed to submit message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-8" onSubmit={handleSubmit}>
      {/* Reason Selection */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Reason</label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full rounded-lg focus:ring-primary11"
          disabled={loading}
        >
          <option value="">-- Select Option --</option>
          <option value="Dispute">Dispute</option>
          <option value="Maltreatment">Maltreatment</option>
          <option value="Suggestion">Suggestion</option>
        </select>
      </div>

      {/* Messages Field */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Messages</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg focus:ring-primary11 h-36"
          placeholder="Briefly describe..."
          disabled={loading}
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
          disabled={loading}
        >
          Return
        </ButtonSmallWhite>
        <ButtonSmallPurple
          padding=""
          width=""
          type="submit"
          className={`py-3.5 px-6 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin text-white text-lg" />
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </ButtonSmallPurple>
      </div>
    </form>
  );
};

export default AnonymousMessageForm;
