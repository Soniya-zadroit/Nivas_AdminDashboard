import React, { useState } from "react";
import { X } from "lucide-react";
import image from "../../assets/Home/contact.png";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
            <h1 className="text-2xl lg:text-3xl font-poppins  text-[#ffb300] mb-4">
              Contact Us
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed text-[16px] lg:text-base">
              Got questions or need support? Our team is here to help you with
              orders, brands, and collaborations. Reach out and let&apos;s make
              fashion seamless for you.
            </p>

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
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder=" " // IMPORTANT: keep empty space for peer-placeholder-shown
                  className="peer w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-[#ffb300] placeholder-transparent"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#ffb300]">
                  Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-[#ffb300] placeholder-transparent"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#ffb300]">
                  Email Address
                </label>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-[#ffb300] placeholder-transparent"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#ffb300]">
                  Phone Number
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#ffb300] text-white font-semibold py-2 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
