import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Overview from "../pages/overview";
import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgetPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";
import VerifyOtp from "../pages/Authentication/VerifyOtp";
import Leave from "../pages/Leave";
import Tasks from "../pages/Tasks";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";

const AllRoutes = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    const checkIfInstalled = () => {
      const isInstalled =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      if (!isInstalled) {
        window.addEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      } else {
        setIsInstallable(false);
      }
    };

    checkIfInstalled();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  return (
    <div>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/staff/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/staff/reset-password/:email"
          element={<ResetPassword />}
        />
        <Route path="/staff/otp-verification/:email" element={<VerifyOtp />} />

        {/* Dashboard Routes */}
        <Route path="/staff/overview" element={<Overview />} />
        <Route path="/staff/leave" element={<Leave />} />
        <Route path="/staff/task" element={<Tasks />} />
        <Route path="/staff/profile" element={<Profile />} />
        <Route path="/staff/notification" element={<Notification />} />
      </Routes>
      {isInstallable && (
        <button
          className="z-30"
          onClick={handleInstallClick}
          style={installButtonStyles}
        >
          Install DIMP-ADMIN
        </button>
      )}
    </div>
  );
};

const installButtonStyles = {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  padding: "10px 20px",
  backgroundColor: "#2B3286",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AllRoutes;
