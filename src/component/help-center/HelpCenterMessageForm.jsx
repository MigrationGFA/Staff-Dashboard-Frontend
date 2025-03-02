import { ButtonSmallPurple } from "../Buttons";

const HelpCenterMessageForm = () => {
  return (
    <form className="p-3 lg:p-8">
      {/* Name Selection */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full rounded-lg focus:border-primary11"
          placeholder="Name"
        />
      </div>

      {/* Department Selection */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">
          Department
        </label>
        <select className="w-full rounded-lg focus:ring-primary11">
          <option>-- Select Option --</option>
          <option>HR</option>
          <option>Engineering</option>
          <option>Marketing</option>
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
      <div className="flex justify-end lg:justify-start">
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
