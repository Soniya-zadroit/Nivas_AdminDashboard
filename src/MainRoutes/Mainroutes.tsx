// MainRoutes/Mainroutes.tsx
import React from "react";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";

import Header from "../Pages/00-Header/Header";
import Home from "../Pages/01-Home/Home";
import Company from "../Pages/02-Company/Company";

import SellerRegistration from "../Pages/05-BrandRegistration/BrandRegistration";
import { Sidebar } from "../Sidebar";
import { StepperProvider } from "../Pages/05-BrandRegistration/StepperHandler/StepperProvider";
import FaqPage from "../Pages/03-FAQ/FaqPage";
import ContactPage from "../Pages/04-Contact/ContactPage";

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

// Global wrapper for header visibility
const Wrapper: React.FC = () => {
  const location = useLocation();

  // Only show header for these paths
  const showHeaderOn = ["/", "/company", "/faq", "/contact"];
  const shouldShowHeader = showHeaderOn.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
    </>
  );
};

const Mainroutes: React.FC = () => {
  return (
    <Routes>
      {/* Wrapper decides header visibility */}
      <Route element={<Wrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />

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
