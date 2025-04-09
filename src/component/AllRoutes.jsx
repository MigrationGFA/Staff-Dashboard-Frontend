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
import Staff from "../pages/Staff";
import AnonymousForm from "../pages/AnonymousForm";
import HelpCenter from "../pages/HelpCenter";
import Training from "../pages/Training";
import AnonymousMessagePage from "./anonymousForm/AnonymousMessagePage";
import HelpCenterMessagePage from "./help-center/HelpCenterMessagePage";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/otp-verification/:email" element={<VerifyOtp />} />

        {/* Dashboard Routes */}
        <Route path="/overview" element={<Overview />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/staff-view" element={<Staff />} />
        <Route path="/anonymous" element={<AnonymousForm />} />
        <Route path="/anonymous-form" element={<AnonymousMessagePage />} />
        <Route path="/training" element={<Training />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/help-center-form" element={<HelpCenterMessagePage />} />
        <Route path="/notification" element={<Notification />} />
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
