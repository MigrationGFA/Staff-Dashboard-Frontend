import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";

const AnonymousMessageForm = () => {
  return (
    <form className="p-8">
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
          Suggestions
        </label>
        <textarea
          className="w-full rounded-lg focus:ring-primary11 h-28"
          placeholder="Briefly describe..."
        ></textarea>
      </div>

      {/* Additional Details Field */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">
          Additional Details
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
        >
          Edit
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
