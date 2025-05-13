import { useState, useEffect } from "react";
import { ButtonSmallPurple } from "../Buttons";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";

const ProfileForm = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [profileImage, setProfileImage] = useState(
    user?.profileData?.imageUrl || null
  );
  const [formData, setFormData] = useState({
    fullName: user?.profileData?.fullName || "",
    email: user?.email || "",
    dateOfBirth: user?.profileData?.dob ? formatDate(user.profileData.dob) : "",
    department: user?.department || "",
    role: user?.role || "",
    contractType: user?.contractType || "",
    phoneNumber: user?.phoneNumber || "",
    homeAddress: user?.homeAddress || "",
    maritalStatus: user?.profileData?.maritalStatus || "",
    nextOfKin: user?.nextOfKin || "",
    nextOfKinAddress: user?.nextOfKinAddress || "",
    nextOfKinContact: user?.profileData?.nextOfKinContact || "",
    medicalStatus: user?.profileData?.medicalStatus || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.profileData?.fullName || "",
        email: user.email || "",
        dateOfBirth: user.profileData?.dob
          ? formatDate(user.profileData.dob)
          : "",
        department: user.department || "",
        role: user.role || "",
        contractType: user.profileData?.contractType || "",
        phoneNumber: user.profileData?.phone || "",
        homeAddress: user.profileData?.address || "",
        maritalStatus: user.profileData?.maritalStatus || "",
        nextOfKin: user.profileData?.nextOfKinName || "",
        nextOfKinAddress: user.profileData?.nextOfKinAddress || "",
        nextOfKinContact: user.profileData?.nextOfKinContact || "",
        medicalStatus: user.profileData?.medicalStatus || "",
      });
    }
  }, [user]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.profileForm({
        accessToken,
        refreshToken,
        formData,
        profileImage,
        userId: user.userId,
      });

      showToast(response.message);
    } catch (error) {
      console.log(error);
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
      </div>

      {/* Form */}
      <form
        className="w-full lg:w-3/5 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-gray-600">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Full Name"
          />
        </div>

        <div>
          <label className="block text-gray-600">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Email Address"
          />
        </div>

        <div>
          <label className="block text-gray-600">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
          />
        </div>

        <div>
          <label className="block text-gray-600">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11 bg-primary6"
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-600">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11 bg-primary6"
            placeholder="Role"
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-600">Contract Type</label>
          <select
            name="contractType"
            value={formData.contractType}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
          >
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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label className="block text-gray-600">Home Address</label>
          <input
            type="text"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Home Address"
          />
        </div>

        <div>
          <label className="block text-gray-600">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
          >
            <option value="-- Select Option --">-- Select Option --</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Next Of Kin</label>
          <input
            type="text"
            name="nextOfKin"
            value={formData.nextOfKin}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Next Of Kin"
          />
        </div>

        <div>
          <label className="block text-gray-600">Next Of Kin Address</label>
          <input
            type="text"
            name="nextOfKinAddress"
            value={formData.nextOfKinAddress}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Next Of Kin Address"
          />
        </div>

        <div>
          <label className="block text-gray-600">Next Of Kin Contact</label>
          <input
            type="text"
            name="nextOfKinContact"
            value={formData.nextOfKinContact}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
            placeholder="Next Of Kin Contact"
          />
        </div>

        <div>
          <label className="block text-gray-600">Medical Status</label>
          <input
            type="text"
            name="medicalStatus"
            value={formData.medicalStatus}
            onChange={handleInputChange}
            className="w-full rounded-lg focus:ring-primary11"
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
            type="submit"
          >
            Save
          </ButtonSmallPurple>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
