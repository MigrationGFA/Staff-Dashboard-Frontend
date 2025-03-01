import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginImage from "../../assets/login-image.png";
import Logo from "../../assets/DIMP logo colored.png";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLongPurple } from "../../component/Buttons";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { Heading, Text } from "../../component/Text";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/authentication";
import { showToast } from "../../component/ShowToast";
import { LabelImportant } from "../../component/Label";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Define the Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  // Set up the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Dispatch the login action
      const resultAction = await dispatch(
        adminLogin({
          email: data.email,
          password: data.password,
        })
      );

      if (adminLogin.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        console.log(data.email, data.password);
        showToast(errorPayload);
      } else if (adminLogin.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message);
        navigate("/staff/overview");
      }
    } catch (error) {
      // Handle unexpected errors, such as network issues
      showToast("An unexpected error occurred. Please try again.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-body">
      <div className="w-full max-w-4xl mx-4">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden my-20">
          <div className="hidden lg:block lg:w-1/2 bg-cover px-10 py-20">
            <img src={LoginImage} alt="Login" />
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-[100px] lg:w-[130px]" />
            </Link>

            <Heading
              level={3}
              className="mb-4 mt-7 font-semibold text-primary4"
              size="3xl"
            >
              Welcome Back
            </Heading>

            <Text className="mb-6" color="sec6">
              Sign in to continue
            </Text>

            <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4">
                <LabelImportant className="block text-gray-700">
                  Email
                </LabelImportant>
                <LongInputWithPlaceholder
                  type="email"
                  placeholder="johndoe@mail.com"
                  className={`mt-2 focus:ring-1 focus:ring-purple-600 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <LabelImportant className="block text-gray-700">
                  Password
                </LabelImportant>
                <div className="relative">
                  <LongInputWithPlaceholder
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`mt-2 focus:ring-1 focus:ring-purple-600 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    {...register("password")}
                  />
                  <div
                    onClick={handleShowPassword}
                    className="absolute top-6 right-3"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center mb-6">
                <Link
                  to="/staff/forgot-password"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* <Text className="mt-16 mb-5 text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/personal-Information"
                  className="text-purple-600 hover:underline"
                >
                  Sign Up
                </Link>
              </Text> */}

              {isLoading ? (
                <ButtonLongPurple
                  className="w-full opacity-50"
                  type="submit"
                  disabled
                >
                  Logging In...
                </ButtonLongPurple>
              ) : (
                <ButtonLongPurple className="w-full" type="submit">
                  Login
                </ButtonLongPurple>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
