import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingSchema } from "../../data/OnboardingSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonLongPurple } from "../../component/Buttons";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { showToast } from "../../component/ShowToast";
import LoginImage from "../../assets/login-image.png";
import api from "../../api/dashboardApi";
import { useEffect, useState } from "react";
import { completeOnboarding } from "../../features/authentication";

const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const user = useSelector((state) => state.auth.user);

  const [reportingStaff, setReportingStaff] = useState([]);

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

  const onSubmit = async (data) => {
    try {
      const payload = {
        // userId: user.userId,
        email: user.email,
        department: user.department,
        role: user.role,
        ...data,
      };

      await dispatch(
        completeOnboarding({
          accessToken,
          refreshToken,
          userId: user.userId,
          payload,
        })
      ).unwrap();

      showToast("Profile created successfully");
      navigate("/overview");
    } catch (error) {
      console.error("Onboarding failed:", error);
      showToast("Failed to submit profile. Try again.");
    }
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
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 p-8"
        >
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
              htmlFor="medicalStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Medical Status
            </label>
            <LongInputWithPlaceholder
              id="medicalStatus"
              placeholder="Medical Status"
              {...register("medicalStatus")}
            />
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
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const fileInput = e.target;
                const file = fileInput.files[0];
                if (file) {
                  const maxSizeInBytes = 3 * 1024 * 1024; // 3MB in bytes
                  if (file.size > maxSizeInBytes) {
                    showToast(
                      "File size exceeds 3MB. Please upload a smaller image."
                    );
                    fileInput.value = "";
                    return;
                  }
                  const imagePreviewUrl = URL.createObjectURL(file);
                  setValue("imageUrl", imagePreviewUrl);
                }
              }}
              className="block w-full text-sm text-gray-700 border rounded-lg"
            />
          </div>
          {/* <div>
            <label
              htmlFor="reportingOfficer"
              className="block text-sm font-medium text-gray-700"
            >
              Reporting Officer
            </label>
          
            <select
              id="reportingOfficer"
              {...register("reportingOfficer")}
              className="block w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Reporting Officer</option>
              {reportingStaff.length > 0 &&
                reportingStaff.map((staff) => (
                  <option
                    key={staff.reportingOfficerId}
                    value={staff.reportingOfficerId}
                  >
                    {staff.reportingOfficerName}
                  </option>
                ))}
            </select>
          </div> */}
          <div>
            <label
              htmlFor="medicalDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Medical Description
            </label>
            <LongInputWithPlaceholder
              id="medicalDescription"
              placeholder="Medical Description"
              {...register("medicalDescription")}
            />
          </div>
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
          <div className="col-span-1 lg:col-span-2 my-3">
            <ButtonLongPurple type="submit" className="w-full">
              Submit Onboarding
            </ButtonLongPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
