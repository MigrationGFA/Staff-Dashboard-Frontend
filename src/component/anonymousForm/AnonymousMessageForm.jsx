import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";
import { useSelector } from "react-redux";

const AnonymousMessageForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reason: "",
    message: "",
  });

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.submitAnonymousMessage({
        accessToken,
        refreshToken,
        formData,
      });
      showToast(response.message);
      setFormData({
        reason: "",
        message: "",
      });
      navigate(-1);
    } catch (error) {
      console.error("Error submitting anonymous message:", error);
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

export default AnonymousMessageForm;
