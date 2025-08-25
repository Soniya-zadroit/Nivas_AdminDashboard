import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import Contact from "../04-Contact/Contact";
import Faq from "../03-FAQ/Faq";

const Header: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(""); // track active tab

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

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <nav className="flex items-center justify-between px-10 py-4 max-w-[100%] mx-auto">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => {
                setActiveTab(""); // reset active when clicking logo
                closeMobileMenu();
              }}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 poppins text-white">
            <Link
              to="/company"
              className={`hover:text-black ${
                activeTab === "company" ? "text-black font-semibold" : ""
              }`}
              onClick={() => {
                setActiveTab("company");
                closeMobileMenu();
              }}
            >
              Company
            </Link>

            <button
              onClick={handleContactClick}
              className={`hover:text-black ${
                activeTab === "contact" ? "text-black font-semibold" : ""
              }`}
            >
              Contact
            </button>
            <button
              onClick={handleFaqClick}
              className={`hover:text-black ${
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
          <Link
            to="/company"
            className={`hover:text-gray-300 pt-8 ${
              activeTab === "company" ? "text-black font-semibold" : ""
            }`}
            onClick={() => {
              setActiveTab("company");
              closeMobileMenu();
            }}
          >
            Company
          </Link>

          <button
            onClick={handleContactClick}
            className={`hover:text-gray-300 ${
              activeTab === "contact" ? "text-black font-semibold" : ""
            }`}
          >
            Contact
          </button>
          <button
            onClick={handleFaqClick}
            className={`hover:text-gray-300 ${
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
