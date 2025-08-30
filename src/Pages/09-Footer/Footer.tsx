import React, { useState } from "react";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { MdCheckCircle } from "react-icons/md";
import logo from "../../assets/Images/Yellowlogo3.png";
import { FaAndroid, FaApple, FaWindows } from "react-icons/fa6";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { IoLogoFacebook } from "react-icons/io";
import { BiLogoTwitter } from "react-icons/bi";
import { RiLinkedinFill } from "react-icons/ri";
import Brand from "../11-BrandEnquiry/Brand";
import Investor from "../10-Investor/Investor";
import Faq from "../03-FAQ/Faq";
import Contact from "../04-Contact/Contact";
import Aboutus from "../12-AboutUs/Aboutus";

const Footer: React.FC = () => {
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isInvestorOpen, setIsInvestorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(""); // track active tab
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    // Mailto
    const to = "zadroit.development@gmail.com"; // your target email
    const subject = encodeURIComponent("Newsletter Subscription");
    const body = encodeURIComponent(
      `Hello,\n\nMy email is: ${email}\nI would like to know more about your services.\n\nThanks.`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    setEmail(""); // Reset input
  };

  const handleBrandClick = () => {
    setIsBrandOpen(true);
    setActiveTab("brand");
    // closeMobileMenu();
  };

  const handleInvestorClick = () => {
    setIsInvestorOpen(true);
    setActiveTab("investor");
    // closeMobileMenu();
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
    setActiveTab("contact");
  };

  const handleAboutClick = () => {
    setIsAboutOpen(true);
    setActiveTab("about");
  };

  const handleFaqClick = () => {
    setIsFaqOpen(true);
    setActiveTab("faq");
  };

  const socials = [
    { icon: TbBrandInstagramFilled, link: "#" },
    { icon: IoLogoFacebook, link: "#" },
    { icon: BiLogoTwitter, link: "#" },
    { icon: RiLinkedinFill, link: "#" },
  ];
  return (
    <footer className="bg-black text-white relative">
      {/* Main Footer */}
      <div className="px-6 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto flex md:flex-row lg:flex-row justify-between gap-12">
          {/* Left Section */}
          <div className="flex flex-col justify-between">
            {/* Logo + Tagline */}
            <div className="space-y-6 ">
              <a
                href="/"
                onClick={() => {
                  setActiveTab("/");
                }}
              >
                <img src={logo} alt="logo" className="w-28 mb-5" />
              </a>

              <p className="text-[#747474] text-sm max-w-sm poppins">
                Heard Of Celebrity To Consumer Platform? <br />
                Stay Tuned!
              </p>

              {/* Email Subscription */}
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Type your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-black border border-[#747474] rounded-full px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black font-semibold px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>

              {/* Social Icons */}
              <div className="flex gap-4">
                {socials.map(({ icon: Icon, link }, idx) => (
                  <a
                    key={idx}
                    href={link}
                    className="border border-[#747474] rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors text-white"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section (Links) */}
          <div className="flex gap-16 poppins">
            <div>
              <h3 className="text-white font-medium mb-4 cursor-pointer">
                <a
                  href="#company"
                  onClick={() => {
                    setActiveTab("company");
                  }}
                >
                  Company
                </a>
              </h3>
              <ul className="space-y-3 text-sm ">
                <li>
                  <button
                    onClick={handleAboutClick}
                    className="hover:text-white text-[#747474] transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className="text-white font-medium mb-4 cursor-pointer"
                onClick={handleContactClick}
              >
                Contact
              </h3>
              <ul className="space-y-3 text-sm ">
                <li>
                  <button
                    onClick={handleBrandClick}
                    className="hover:text-white text-[#747474] transition-colors cursor-pointer"
                  >
                    Brand Enquiry
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleInvestorClick}
                    className="hover:text-white text-[#747474] transition-colors cursor-pointer"
                  >
                    Investor Relations
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Other</h3>
              <ul className="space-y-3 text-sm text-[#747474]">
                <li>
                  <button
                    onClick={handleFaqClick}
                    className="hover:text-white text-[#747474] transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Launching Soon + Platforms */}
      <div className="px-6 lg:px-20 pb-8">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
          {/* Launching Soon */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MdCheckCircle className="text-white" />
            <span>Launching Soon on</span>
          </div>

          {/* Platforms */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {/* Windows */}
              <div className="flex items-center  gap-2 border border-[#747474] px-4 py-2 rounded-full text-[10px] text-white">
                <FaWindows size={16} />
                Windows
              </div>
              {/* macOS */}
              <div className="flex items-center gap-2 border border-[#747474] px-4 py-2 rounded-full text-[10px]  text-white">
                <FaApple size={16} />
                macOS
              </div>
              {/* iOS */}
              <div className="flex items-center gap-2 border border-[#747474] px-4 py-2 rounded-full text-[10px] text-white">
                <FaApple size={16} />
                iOS
              </div>
              {/* Android */}
              <div className="flex items-center gap-2 border border-[#747474] px-4 py-2 rounded-full text-[10px] text-white">
                <FaAndroid size={16} />
                Android
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#ffb300] px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 poppins">
          <p className="text-white text-sm">
            © 2024 All Rights Reserved to Naaysu Technologies Pvt ltd.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-white  hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-white hover:underline">
              Cookies
            </a>
          </div>
        </div>
      </div>

      <Brand isOpen={isBrandOpen} onClose={() => setIsBrandOpen(false)} />

      <Investor
        isOpen={isInvestorOpen}
        onClose={() => setIsInvestorOpen(false)}
      />

      <Faq
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />
      <Aboutus isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};

export default Footer;
