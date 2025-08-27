import React, { useState } from "react";
import { X } from "lucide-react";
import image from "../../assets/Home/Brand.png";
import "../10-Investor/Investor.css";

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Brand: React.FC<BrandModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    enquiry: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // TODO: handle submission
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed poppins inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-800 relative flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()} // prevent modal close on inside click
      >
        {/* Left side - Image */}
        <div className="lg:w-1/2 md:w-1/2 hidden lg:flex items-center justify-center bg-black">
          <img
            src={image}
            alt="Contact"
            className="w-[90%] h-[90%] object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2  p-6 lg:p-10 bg-[#000] flex flex-col justify-between">
          {/* Mobile image (only for small screens) */}
          <div className="lg:hidden md:hidden mb-6 flex justify-center">
            <img
              src={image}
              alt="Contact"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-poppins  text-white mb-4">
              Brand Enquiry
            </h1>
            <p className="text-[#808080] mb-6  leading-relaxed text-[16px] poppins font-extralight lg:text-base">
            We truly believe your brand could be doing as great as you are <span className="text-[#bfbfbf] mb-6 leading-relaxed text-[16px] poppins font-extralight lg:text-base">Speak to us.</span>
            </p>
            {/* <p className="text-[#bfbfbf] mb-6 leading-relaxed text-[16px] poppins font-extralight lg:text-base">
              Here us out!
            </p> */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-8"
            >
              {/* Name */}
              <div className="relative">
                <input
                  id="investor-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder=" " // important: single space to enable :placeholder-shown
                  className="w-full floating-input" // you can add other tailwind classes if needed
                />
                <label htmlFor="investor-name" className="floating-label">
                  Name
                </label>
              </div>
                {/* Subject */}
              <div className="relative">
                <input
                  id="investor-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder=" " // important: single space to enable :placeholder-shown
                  className="w-full floating-input" // you can add other tailwind classes if needed
                />
                <label htmlFor="investor-name" className="floating-label">
                  Subject 
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  id="investor-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="w-full floating-input"
                />
                <label htmlFor="investor-email" className="floating-label">
                  Email Id
                </label>
              </div>

                {/* Enquiry */}
              <div className="relative">
                <input
                  id="investor-enquiry"
                  type="text"
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleInputChange}
                  placeholder=" " // important: single space to enable :placeholder-shown
                  className="w-full floating-input" // you can add other tailwind classes if needed
                />
                <label htmlFor="investor-name" className="floating-label">
                  Enquiry 
                </label>
              </div>

            

              {/* Submit */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#ffb300] text-white font-normal py-2 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95"
                >
                  Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
