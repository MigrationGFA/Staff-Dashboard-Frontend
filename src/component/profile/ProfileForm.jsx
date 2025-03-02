import { useState } from "react";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";

const ProfileForm = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 my-6 flex flex-col lg:flex-row items-center justify-around">
      {/* Profile Image */}
      <div className="lg:w-2/5 flex flex-col items-center lg:mb-14">
        <div className="w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center border border-sec11">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <span className="text-sec11">Add Image</span>
          )}
        </div>
        <div className="px-10">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="mt-2 border rounded-lg hover:bg-purple-100 transition"
            id="profileImageInput"
          />
        </div>
        {/* <label htmlFor="profileImageInput">
          <ButtonSmallWhite className="mt-2 border px-4 py-2 rounded-lg hover:bg-purple-100 transition">
            Change your profile
          </ButtonSmallWhite>
        </label> */}
      </div>

      {/* Form */}
      <form className="w-full lg:w-3/5 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Full Name"
          />
        </div>

        <div>
          <label className="block text-gray-600">Email Address</label>
          <input
            type="email"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Email Address"
          />
        </div>

        <div>
          <label className="block text-gray-600">Date of Birth</label>
          <input
            type="date"
            className="w-full rounded-lg focus:border-primary11"
          />
        </div>

        <div>
          <label className="block text-gray-600">Department</label>
          <select className="w-full rounded-lg focus:border-primary11">
            <option>-- Select Option --</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>HR</option>
          </select>
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
          <label className="block text-gray-600">Contract Type</label>
          <select className="w-full rounded-lg focus:border-primary11">
            <option>-- Select Option --</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Phone Number</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Phone Number"
          />
        </div>

        {/* <div>
          <label className="block text-gray-600">Emergency Contact</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Emergency Contact"
          />
        </div> */}

        <div>
          <label className="block text-gray-600">Home Address</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Home Address"
          />
        </div>

        <div>
          <label className="block text-gray-600">Marital Status</label>
          <select className="w-full rounded-lg focus:border-primary11">
            <option>-- Select Option --</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Next Of Kin</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Next Of Kin"
          />
        </div>

        <div>
          <label className="block text-gray-600">Next Of Kin Address</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Next Of Kin Address"
          />
        </div>

        <div>
          <label className="block text-gray-600">Next Of Kin Contact</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Next Of Kin Contact"
          />
        </div>

        <div>
          <label className="block text-gray-600">Medical Status</label>
          <input
            type="text"
            className="w-full rounded-lg focus:border-primary11"
            placeholder="Medical Status"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end mt-6">
          <ButtonSmallPurple
            padding=""
            height=""
            width=""
            className="px-8 py-2 rounded-lg transition"
          >
            Save
          </ButtonSmallPurple>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
