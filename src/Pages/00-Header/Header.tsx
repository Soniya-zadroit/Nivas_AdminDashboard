import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import Contact from "../04-Contact/Contact";
import Faq from "../03-FAQ/Faq";

const Header: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(""); 
  const location = useLocation();

  // Check if we're on home page and which section is visible
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const handleScroll = () => {
      const companySection = document.getElementById("company");
      if (companySection) {
        const rect = companySection.getBoundingClientRect();
        const isCompanyVisible = rect.top <= 100 && rect.bottom >= 100;
        
        if (isCompanyVisible) {
          setActiveTab("company");
        } else {
          setActiveTab("");
        }
      }
    };

    // Listen to scroll events on the main container
    const homeContainer = document.querySelector('.home-scroll-container');
    if (homeContainer) {
      homeContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      
      return () => {
        homeContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
    setActiveTab("contact");
    closeMobileMenu();
  };

  const handleFaqClick = () => {
    setIsFaqOpen(true);
    setActiveTab("faq");
    closeMobileMenu();
  };

  const handleCompanyClick = () => {
    if (location.pathname === "/") {
      // Smooth scroll to company section
      const companySection = document.getElementById("company");
      if (companySection) {
        companySection.scrollIntoView({ behavior: "smooth" });
      }
      setActiveTab("company");
    }
    closeMobileMenu();
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Scroll to top of home page
      const homeContainer = document.querySelector('.home-scroll-container');
      if (homeContainer) {
        homeContainer.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Navigate to home page
      window.location.href = "/";
    }
    setActiveTab("");
    closeMobileMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <nav className="flex items-center justify-between px-10 py-4 max-w-[100%] mx-auto">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={handleLogoClick}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 poppins text-white">
            <button
              onClick={handleCompanyClick}
              className={`hover:text-black transition-colors ${
                activeTab === "company" ? "text-black font-semibold" : ""
              }`}
            >
              Company
            </button>

            <button
              onClick={handleContactClick}
              className={`hover:text-black transition-colors ${
                activeTab === "contact" ? "text-black font-semibold" : ""
              }`}
            >
              Contact
            </button>
            <button
              onClick={handleFaqClick}
              className={`hover:text-black transition-colors ${
                activeTab === "faq" ? "text-black font-semibold" : ""
              }`}
            >
              FAQ
            </button>
          </div>

          <div className="md:hidden">
            <button
              className="text-white focus:outline-none text-2xl"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } flex-col items-center space-y-4 py-4 bg-[#feb000d6] bg-opacity-80 text-white md:hidden relative`}
        >
          <button
            onClick={closeMobileMenu}
            className="absolute top-2 right-4 text-white text-2xl hover:text-gray-300"
          >
            ✕
          </button>
          <button
            onClick={handleCompanyClick}
            className={`hover:text-gray-300 pt-8 transition-colors ${
              activeTab === "company" ? "text-black font-semibold" : ""
            }`}
          >
            Company
          </button>

          <button
            onClick={handleContactClick}
            className={`hover:text-gray-300 transition-colors ${
              activeTab === "contact" ? "text-black font-semibold" : ""
            }`}
          >
            Contact
          </button>
          <button
            onClick={handleFaqClick}
            className={`hover:text-gray-300 transition-colors ${
              activeTab === "faq" ? "text-black font-semibold" : ""
            }`}
          >
            FAQ
          </button>
        </div>
      </header>

      <Faq
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;