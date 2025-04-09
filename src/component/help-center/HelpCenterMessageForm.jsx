import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";

const HelpCenterMessageForm = () => {
  const navigate = useNavigate();
  return (
    <form className="p-3 lg:p-8">
      {/* Reason Selection */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Reason</label>
        <select className="w-full rounded-lg focus:ring-primary11">
          <option>-- Select Option --</option>
          <option>Dispute</option>
          <option>Maltreatment</option>
          <option>Suggestion</option>
        </select>
      </div>

      {/* Suggestions Field */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">
          How can we help?
        </label>
        <textarea
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
