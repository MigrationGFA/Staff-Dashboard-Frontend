import { IoClose } from "react-icons/io5";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";

const AddStaffModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50 overflow-y-auto lg:overflow-y-hidden">
      <div className="bg-white mt-20 lg:mt-0 lg:w-1/2 rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-sec11">Add Staff</h2>
          <button onClick={onClose} className="text-primary5 hover:text-sec11">
            <IoClose size={24} />
          </button>
        </div>

        <p className="text-primary5 text-sm mt-2">Kindly enter the details</p>

        {/* Form */}
        <form className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Staff Name</label>
              <input
                type="text"
                className="w-full rounded-lg focus:border-primary11"
                placeholder="Staff name"
              />
            </div>

            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full rounded-lg focus:border-primary11"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-gray-600">Role</label>
              <input
                type="text"
                className="w-full rounded-lg focus:border-primary11"
                placeholder="Role"
              />
            </div>

            <div>
              <label className="block text-gray-600">Duration</label>
              <input
                type="text"
                className="w-full rounded-lg focus:border-primary11"
                placeholder="Duration"
              />
            </div>

            <div>
              <label className="block text-gray-600">Department</label>
              <select className="w-full rounded-lg focus:border-primary11">
                <option>-- Select Option --</option>
                <option>Engineering Department</option>
                <option>Marketing Department</option>
                <option>Finance Department</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Contract Type</label>
              <select className="w-full rounded-lg focus:border-primary11">
                <option>-- Select Option --</option>
                <option>Full-time</option>
                <option>Intern</option>
                <option>Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Date of Resumption</label>
              <select className="w-full rounded-lg focus:border-primary11">
                <option>-- Select Option --</option>
                <option>Jan 6, 2025</option>
                <option>Jan 11, 2025</option>
                <option>Jan 12, 2025</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Contract End Date</label>
              <select className="w-full rounded-lg focus:border-primary11">
                <option>-- Select Option --</option>
                <option>Jan 6, 2025</option>
                <option>Jan 11, 2025</option>
                <option>Jan 12, 2025</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <ButtonSmallWhite
              width=""
              padding=""
              type="button"
              className="px-4 py-2 rounded-lg transition h-auto"
            >
              Edit
            </ButtonSmallWhite>
            <ButtonSmallPurple
              width=""
              padding=""
              height=""
              className="px-4 py-2 rounded-lg transition h-auto"
            >
              Save
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
