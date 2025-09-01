// MainRoutes/Mainroutes.tsx
import React from "react";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";

import Home from "../Pages/01-Home/Home";
import SellerRegistration from "../Pages/05-BrandRegistration/BrandRegistration";
import { Sidebar } from "../Sidebar";
import { StepperProvider } from "../Pages/05-BrandRegistration/StepperHandler/StepperProvider";
import FaqPage from "../Pages/03-FAQ/FaqPage";
import ContactPage from "../Pages/04-Contact/ContactPage";
import Login from "../Pages/07-Login/Login";
import PasswordPage from "../Pages/08-Password/PasswordPage";
import Footer from "../Pages/09-Footer/Footer";
import InvestorPage from "../Pages/10-Investor/InvestorPage";
import BrandPage from "../Pages/11-BrandEnquiry/BrandPage";
import AboutusPage from "../Pages/12-AboutUs/AboutusPage";
import Header from "../Pages/00-Header/Header";

// --------------------- HashHandler Component ---------------------
const HashHandler: React.FC = () => {
  React.useEffect(() => {
    const hash = window.location.hash; // e.g., "#id:AP202508310001"

    if (hash.startsWith("#id:")) {
      const applicationId = hash.replace("#id:", "");
      sessionStorage.setItem("applicationId", applicationId);

      // Remove hash from URL without reloading
      window.history.replaceState(
        null,
        "",
        window.location.origin + window.location.pathname
      );
    }
  }, []);

  return null; // No UI
};

// --------------------- Layouts ---------------------

// Layout with sidebar
const Layout: React.FC = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-6 h-screen overflow-y-auto">
      <Outlet />
    </main>
  </div>
);

// Layout specifically for brand registration with StepperProvider
const BrandRegistrationLayout: React.FC = () => (
  <StepperProvider>
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </StepperProvider>
);

// Global wrapper for header/footer visibility
const Wrapper: React.FC = () => {
  const location = useLocation();

  // Only show header for these paths
  const showHeaderOn = ["/", "/company", "/faq", "/contact", "/about"];
  const shouldShowHeader = showHeaderOn.includes(location.pathname);

  const showFooterOn = ["/", "/company", "/faq", "/contact", "/about"];
  const shouldShowFooter = showFooterOn.includes(location.pathname);

  return (
    <>
      <HashHandler /> {/* Handles applicationId from URL */}
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowFooter && <Footer />}
    </>
  );
};

// --------------------- Main Routes ---------------------
const Mainroutes: React.FC = () => {
  return (
    <Routes>
      {/* Wrapper decides header/footer visibility */}
      <Route element={<Wrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/investor" element={<InvestorPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/about" element={<AboutusPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/footer" element={<Footer />} />

        {/* Brand registration with its own layout and context */}
        <Route element={<BrandRegistrationLayout />}>
          <Route path="/brandRegistration" element={<SellerRegistration />} />
        </Route>

        {/* Other pages that need sidebar without stepper context */}
        <Route element={<Layout />}>
          {/* Add other sidebar routes here if needed */}
        </Route>
      </Route>
    </Routes>
  );
};

export default Mainroutes;
