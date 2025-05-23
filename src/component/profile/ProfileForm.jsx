import { useState, useEffect } from "react";
import { ButtonSmallPurple } from "../Buttons";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";
import { FaSpinner } from "react-icons/fa";
import { setProfile, updateProfile } from "../../features/profile";

const ProfileForm = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const userProfile = useSelector((state) => state?.profile?.profile);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [profileImage, setProfileImage] = useState(
    userProfile?.imageUrl || user?.profile?.imageUrl || null
  );
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || user?.profile?.fullName || "",
    email: userProfile?.email || "",
    dob: userProfile?.dob
      ? formatDate(userProfile?.dob)
      : user?.profile?.dob
      ? formatDate(user?.profile?.dob)
      : "",
    department: user?.department || "",
    role: user?.role || "",
    contractType: user?.contractType || "",
    phone: userProfile?.phone || user?.phone || user?.phoneNumber || "",
    address: userProfile?.address || user?.address || user?.homeAddress || "",
    maritalStatus: user?.maritalStatus?.trim()
      ? user.maritalStatus
      : user?.profile?.maritalStatus || "",

    nextOfKinName:
      userProfile?.nextOfKinName ||
      user?.nextOfKinName ||
      user?.nextOfKin ||
      "",
    nextOfKinAddress:
      userProfile?.nextOfKinAddress || user?.nextOfKinAddress || "",
    nextOfKinContact:
      userProfile?.nextOfKinContact ||
      user?.nextOfKinContact ||
      user?.profile?.nextOfKinContact ||
      "",
    genotype: userProfile?.genotype || user.profile?.genotype || "",
    bloodGroup: userProfile?.bloodGroup || user.profile?.bloodGroup || "",
    allergies: userProfile?.allergies || user.profile?.allergies || [],
    newAllergy: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName:
          userProfile?.fullName ||
          user?.fullName ||
          user.profile?.fullName ||
          "",
        email: userProfile?.email || user.email || "",
        dob: userProfile?.dob
          ? formatDate(userProfile?.dob)
          : user?.profile?.dob
          ? formatDate(user?.profile?.dob)
          : "",

        department: user.department || "",
        role: user.role || "",
        contractType: user?.contractType || user.profile?.contractType || "",
        phone: userProfile?.phone || user?.phone || user.profile?.phone || "",
        address:
          userProfile?.address || user?.address || user.profile?.address || "",
        maritalStatus: user?.maritalStatus?.trim()
          ? user.maritalStatus
          : user?.profile?.maritalStatus || "",
        nextOfKinName:
          userProfile?.nextOfKinName ||
          user?.nextOfKinName ||
          user.profile?.nextOfKinName ||
          "",
        nextOfKinAddress:
          userProfile?.nextOfKinAddress ||
          user?.nextOfKinAddress ||
          user.profile?.nextOfKinAddress ||
          "",
        nextOfKinContact:
          userProfile?.nextOfKinContact ||
          user?.nextOfKinContact ||
          user.profile?.nextOfKinContact ||
          "",
        genotype: userProfile?.genotype || user.profile?.genotype || "",
        bloodGroup: userProfile?.bloodGroup || user.profile?.bloodGroup || "",
        allergies: userProfile?.allergies || user.profile?.allergies || [],
        newAllergy: "",
      });
    }
  }, [user]);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInMB = 3;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        showToast(
          `File size exceeds ${maxSizeInMB}MB. Please upload a smaller file.`,
          "error"
        );
        event.target.value = "";
        return;
      }

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
    setLoading(true);

    try {
      const data = new FormData();

      // for (const key in formData) {
      //   data.append(key, formData[key]);
      // }
      for (const key in formData) {
        if (key !== "newAllergy") {
          if (Array.isArray(formData[key])) {
            data.append(key, formData[key].length > 0 ? formData[key] : "");
          } else {
            data.append(key, formData[key]);
          }
        }
      }

      const fileInput = document.getElementById("profileImageInput");
      if (fileInput?.files?.[0]) {
        data.append("image", fileInput.files[0]);
      }

      const response = await api.profileForm({
        accessToken,
        refreshToken,
        formData: data,
        userId: user.userId,
      });

      dispatch(updateProfile(response.data));
      showToast(response.message);
    } catch (error) {
      console.error(error);
      showToast(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 my-2 flex flex-col lg:flex-row items-center justify-around">
      {/* Form */}
      <form
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mt-6"
        onSubmit={handleSubmit}
      >
        {/* Profile Image */}
        <div className="col-span-2 lg:col-span-1 place-self-center flex flex-col items-center lg:mb-14">
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

        <div className="col-span-2 lg:col-span-1 p-4 border border-gray-300 rounded-md mt-4">
          <h3 className="text-md font-semibold mb-3 text-gray-700">
            General Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <div className="col-span-2 lg:col-span-1">
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

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600 ">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11 bg-primary6"
                placeholder="Email Address"
                disabled
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
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

            <div className="col-span-2 lg:col-span-1">
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

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Contract Type</label>
              <input
                type="text"
                name="contractType"
                value={formData.contractType}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11 bg-primary6"
                disabled
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
                placeholder="Phone Number"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Home Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
                placeholder="Home Address"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
              >
                <option value="-- Select Option --">-- Select Option --</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 border border-gray-300 rounded-md mt-4">
          <h3 className="text-md font-semibold mb-3 text-gray-700">
            Next of kin Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Next Of Kin Name</label>
              <input
                type="text"
                name="nextOfKinName"
                value={formData.nextOfKinName}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
                placeholder="Next Of Kin Name"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
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

            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Next Of Kin Contact</label>
              <input
                type="number"
                name="nextOfKinContact"
                value={formData.nextOfKinContact}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
                placeholder="Next Of Kin Contact"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 border border-gray-300 rounded-md mt-4">
          <h3 className="text-md font-semibold mb-3 text-gray-700">
            Medical Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            {/* Genotype */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Genotype</label>
              <select
                name="genotype"
                value={formData.genotype}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
              >
                <option value="">-- Select Genotype --</option>
                <option value="AA">AA</option>
                <option value="AS">AS</option>
                <option value="SS">SS</option>
                <option value="AC">AC</option>
                <option value="SC">SC</option>
              </select>
            </div>

            {/* Blood Group */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block text-gray-600">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-primary11"
              >
                <option value="">-- Select Blood Group --</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Allergies */}
            <div className="col-span-2">
              <label className="block text-gray-600">Allergies</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="newAllergy"
                  value={formData.newAllergy}
                  onChange={(e) =>
                    setFormData({ ...formData, newAllergy: e.target.value })
                  }
                  className="w-full rounded-lg focus:ring-primary11"
                  placeholder="Enter allergy and press Add"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-primary11 text-white rounded"
                  onClick={() => {
                    if (formData.newAllergy.trim() !== "") {
                      setFormData({
                        ...formData,
                        allergies: [
                          ...formData.allergies,
                          formData.newAllergy.trim(),
                        ],
                        newAllergy: "",
                      });
                    }
                  }}
                >
                  Add
                </button>
              </div>
              {/* Display added allergies */}
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {allergy}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          allergies: formData.allergies.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <ButtonSmallPurple
          padding=""
          height=""
          width=""
          className={`col-span-2 px-8 py-2 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin text-white text-lg" />
              <span>Saving...</span>
            </div>
          ) : (
            "Save"
          )}
        </ButtonSmallPurple>
      </form>
    </div>
  );
};

export default ProfileForm;
