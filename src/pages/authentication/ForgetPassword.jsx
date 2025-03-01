import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/login-image.png";
import Logo from "../../assets/DIMP logo colored.png";
import { showToast } from "../../component/ShowToast";
import api from "../../api/authRoute";
import { ButtonForTabs, ButtonSmallPurple } from "../../component/Buttons";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { LabelImportant } from "../../component/Label";
import { Text } from "../../component/Text";
import { useState } from "react";

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Function to handle form submission
  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await api.adminForgetPassword({
        email: data.email,
      });

      if (response.status === 200) {
        showToast(response.data.message);
        // setShowSuccessModal(true);
        navigate(`/admin/otp-verification/${data.email}`);

      } else {
        showToast(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sec1 font-body">
      <div className="bg-primary1 rounded-[30px] shadow-xl flex lg:w-10/12 mx-2 lg:mx-auto">
        {/* Left Section - Illustration Image */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-sec1 to-sec1 rounded-l-lg w-1/2 p-8">
          <img
            src={LoginImage}
            alt="Illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full lg:w-1/2 lg:p-24  p-5 text-left">
          <div className="flex flex-col ">
            {/* Logo */}
            <div className="mb-6">
              <img src={Logo} alt="Logo" className="w-24 h-auto" />
            </div>

            <h2 className="text-xl font-semibold mb-4">
              Forgot your password?
            </h2>
            <p className="text-ter12 mb-8 text-sm text-left">
              Kindly enter your email to reset your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-4">
                <LabelImportant htmlFor="email" className="mb-3">
                  Email
                </LabelImportant>
                <LongInputWithPlaceholder
                  id="email"
                  type="email"
                  placeholder="Email address here"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary3 ${
                    errors.email ? "border-ter7" : "border-sec2"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-ter7 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <ButtonSmallPurple
                type="submit"
                className="w-full font-semibold py-2 rounded-md transition duration-300"
              >
                Send Reset Link
              </ButtonSmallPurple>
            </form>

            <p className="mt-6 text-sec11">
              Return to the{" "}
              <Link to="/" className="text-primary3 hover:underline">
                Sign in
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {/* {showSuccessModal && (
        <div className="fixed inset-0 flex bg-black bg-opacity-60 backdrop-blur-sm items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Reset link Sent</Text>
              <ButtonForTabs
                className="text-gray-500"
                onClick={() => setShowSuccessModal(false)}
                label={<>&times;</>}
              />
            </div>
            <div className="flex justify-center mb-3">
              <img src={Logo} alt="Logo" className="w-20 mb-2" />
            </div>
            <Text className="text-center">
              Check your email to access your Reset link.
            </Text>
            <div className="flex justify-center mt-4">
              <ButtonSmallPurple
                className=" text-white font-semibold py-2 px-4 rounded"
                onClick={handleCloseModal}
                width=""
              >
                Close
              </ButtonSmallPurple>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ForgotPassword;
