const AnonymousMessageForm = () => {
  return (
    <div className="max-w-3xl mx-auto bg-purple-50 p-8 rounded-lg shadow-lg">
      {/* Department Selection */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">
          Department
        </label>
        <select className="input-field">
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
          className="input-field h-28"
          placeholder="Briefly describe..."
        ></textarea>
      </div>

      {/* Additional Details Field */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">
          Additional Details
        </label>
        <textarea
          className="input-field h-28"
          placeholder="Briefly describe..."
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button className="border border-purple-500 text-purple-500 px-6 py-2 rounded-lg hover:bg-purple-100 transition">
          Edit
        </button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AnonymousMessageForm;
