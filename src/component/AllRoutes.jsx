import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Overview from "../pages/overview";

import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgetPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";
import VerifyOtp from "../pages/Authentication/VerifyOtp";

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
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin/reset-password/:email"
          element={<ResetPassword />}
        />
        <Route path="/admin/otp-verification/:email" element={<VerifyOtp />} />

        {/* Dashboard Routes */}
        <Route path="/admin/overview" element={<Overview />} />
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
