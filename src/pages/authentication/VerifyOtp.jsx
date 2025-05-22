import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  LongInputWithPlaceholder,
  ShortInputWithPlaceholder,
} from "../../component/Inputs";
import { Text, Heading } from "../../component/Text";
import { showToast } from "../../component/ShowToast";
import api from "../../api/authRoute";
import { MdOutlineMailOutline } from "react-icons/md";
import { LabelImportant } from "../../component/Label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VerifyOtp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setValue(`otp[${index}]`, value);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      trigger();
    } else if (value === "") {
      setValue(`otp[${index}]`, "");
      trigger();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      pastedData.split("").forEach((digit, index) => {
        setValue(`otp[${index}]`, digit);
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = digit;
        }
      });
      inputRefs.current[5]?.focus();
      trigger();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setValue(`otp[${index}]`, "");
      if (inputRefs.current[index]) inputRefs.current[index].value = "";
      if (index > 0 && inputRefs.current[index - 1])
        inputRefs.current[index - 1].focus();
      trigger();
    }
  };

  const handleFocus = (index) => {
    if (inputRefs.current[index]) inputRefs.current[index].select();
  };

  const isOtpComplete = () => {
    return new Array(6)
      .fill("")
      .map((_, index) => getValues(`otp[${index}]`))
      .every((digit) => digit !== undefined && digit !== "");
  };

  const handleSubmit = async () => {
    const otp = new Array(6)
      .fill("")
      .map((_, index) => getValues(`otp[${index}]`))
      .join("");

    if (!otp || !newPassword || !confirmPassword) {
      showToast("All fields are required.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await api.adminResetPassword({
        email,
        verifyOtp: otp,
        password: newPassword,
      });

      showToast(
        response.data.message || "Password reset successful!",
        "success"
      );
      navigate("/");
    } catch (err) {
      showToast(
        err?.response?.data?.message || "An error occurred. Try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-sec1">
      <div className="bg-primary1 shadow-lg rounded-lg w-11/12 md:w-10/12 lg:w-8/12 h-auto p-6 md:p-8 flex">
        <div className="w-1/2 hidden md:block">
          <MdOutlineMailOutline size={300} />
        </div>

        <div className="w-full md:w-1/2">
          <Heading
            level={2}
            className="font-semibold mb-3"
            size="xl"
            color="primary4"
          >
            Verify OTP & Reset Password
          </Heading>
          <Text className="mb-6 text-sm text-primary8">
            Enter the OTP sent to your email and choose your new password.
          </Text>

          {/* OTP */}
          <div className="flex justify-between mb-6 space-x-2">
            {new Array(6).fill("").map((_, index) => (
              <ShortInputWithPlaceholder
                key={index}
                placeholder="0"
                maxLength="1"
                className={`w-14 h-12 border text-center text-lg focus:outline-none ${
                  errors.otp && errors.otp[index]
                    ? "border-ter7"
                    : "border-sec2"
                }`}
                {...register(`otp[${index}]`, { required: true })}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                onFocus={() => handleFocus(index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* Password */}
          <div className="mb-4">
            <LabelImportant className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </LabelImportant>
            <div className="flex items-center">
              <LongInputWithPlaceholder
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="ml-2 cursor-pointer"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <LabelImportant className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </LabelImportant>
            <div className="flex items-center">
              <LongInputWithPlaceholder
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isOtpComplete()}
            className={`w-full bg-primary3 text-white font-semibold py-3 px-4 rounded-lg ${
              !isOtpComplete() || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
