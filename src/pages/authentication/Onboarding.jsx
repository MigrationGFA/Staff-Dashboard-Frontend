import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingSchema } from "../../data/onboardingSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonLongPurple } from "../../component/Buttons";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { showToast } from "../../component/ShowToast";
import LoginImage from "../../assets/login-image.png";
import { useState } from "react";
import { completeOnboarding } from "../../features/authentication";
import { FaSpinner } from "react-icons/fa";

const Onboarding = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [allergyInput, setAllergyInput] = useState("");
  const [allergiesList, setAllergiesList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const user = useSelector((state) => state?.auth?.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(onboardingSchema) });

  // const fetchReportingStaff = async () => {
  //   try {
  //     const response = await api.getreportingStaff({
  //       accessToken,
  //       refreshToken,
  //       email: user.email,
  //     });
  //     setReportingStaff(Array.isArray(response) ? response : [response]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchReportingStaff();
  // }, [accessToken, refreshToken]);

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     const payload = {
  //       // userId: user.userId,
  //       email: user.email,
  //       department: user.department,
  //       role: user.role,
  //       ...data,
  //     };

  //     await dispatch(
  //       completeOnboarding({
  //         accessToken,
  //         refreshToken,
  //         userId: user.userId,
  //         payload,
  //       })
  //     ).unwrap();

  //     showToast("Profile created successfully");
  //     navigate("/overview");
  //   } catch (error) {
  //     console.error("Onboarding failed:", error);
  //     showToast("Failed to submit profile. Try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      formData.append("email", user.email);
      formData.append("department", user.department);
      formData.append("role", user.role);

      const fileInput = document.getElementById("profileImageInput");
      if (fileInput?.files?.[0]) {
        formData.append("image", fileInput.files[0]);
      }

      await dispatch(
        completeOnboarding({
          accessToken,
          refreshToken,
          userId: user.userId,
          payload: formData,
        })
      ).unwrap();

      showToast("Profile created successfully");
      navigate("/overview");
    } catch (error) {
      console.error("Onboarding failed:", error);
      showToast("Failed to submit profile. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleAddAllergy = () => {
    const trimmed = allergyInput.trim();
    if (trimmed && !allergiesList.includes(trimmed)) {
      const updatedAllergies = [...allergiesList, trimmed];
      setAllergiesList(updatedAllergies);
      setValue("allergies", updatedAllergies);
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (item) => {
    const updatedAllergies = allergiesList.filter((i) => i !== item);
    setAllergiesList(updatedAllergies);
    setValue("allergies", updatedAllergies);
  };

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      showToast(error.message);
    });
  };

  return (
    <div className="p-6 mx-auto my-10 font-body">
      <h2 className="text-4xl font-semibold mt-2 text-center">
        Complete Your Onboarding
      </h2>

      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden lg:block lg:w-1/2 bg-cover px-10 py-20">
          <img src={LoginImage} alt="Login" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 p-8"
        >
          <div className="lg:col-span-2 p-4 border border-gray-300 rounded-md mt-4">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              General Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <LongInputWithPlaceholder
                  id="fullName"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <LongInputWithPlaceholder
                  id="phone"
                  type="number"
                  min="0"
                  placeholder="Phone"
                  {...register("phone")}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <LongInputWithPlaceholder
                  id="address"
                  placeholder="Address"
                  {...register("address")}
                />
              </div>
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  {...register("maritalStatus")}
                  className="block w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <LongInputWithPlaceholder
                  id="dob"
                  type="date"
                  placeholder="Date of Birth"
                  {...register("dob")}
                />
              </div>
              {/* <div className="w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center border border-sec11">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-sec11">Add Image</span>
            )}
          </div> */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  {...register("image")}
                  className="block w-full text-sm text-gray-700 border rounded-lg"
                  id="profileImageInput"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 p-4 border border-gray-300 rounded-md mt-4">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              Next Of Kin Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nextOfKinName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Next of Kin Name
                </label>
                <LongInputWithPlaceholder
                  id="nextOfKinName"
                  placeholder="Next of Kin Name"
                  {...register("nextOfKinName")}
                />
              </div>
              <div>
                <label
                  htmlFor="nextOfKinAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Next of Kin Address
                </label>
                <LongInputWithPlaceholder
                  id="nextOfKinAddress"
                  placeholder="Next of Kin Address"
                  {...register("nextOfKinAddress")}
                />
              </div>
              <div>
                <label
                  htmlFor="nextOfKinContact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Next of Kin Contact
                </label>
                <LongInputWithPlaceholder
                  id="nextOfKinContact"
                  type="number"
                  min="0"
                  placeholder="Next of Kin Name"
                  {...register("nextOfKinContact")}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 p-4 border border-gray-300 rounded-md mt-4">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              Medical Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="genotype"
                  className="block text-sm font-medium text-gray-700"
                >
                  Genotype
                </label>
                <select
                  id="genotype"
                  {...register("genotype")}
                  className="block w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Genotype</option>
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                  <option value="AC">AC</option>
                  <option value="SC">SC</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  {...register("bloodGroup")}
                  className="block w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Blood Group</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    placeholder="e.g. Peanuts"
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="px-4 py-2 text-white bg-purple-600 rounded-md"
                  >
                    Add
                  </button>
                </div>

                {allergiesList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {allergiesList.map((item, index) => (
                      <span
                        key={index}
                        className="flex items-center px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded-full"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(item)}
                          className="ml-2 text-purple-600 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 my-3">
            <ButtonLongPurple
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="animate-spin text-white text-lg" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Onboarding"
              )}
            </ButtonLongPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
