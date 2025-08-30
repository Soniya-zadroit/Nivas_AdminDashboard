import React, { useState } from "react";
import image from "../../assets/Home/Investor.png";
import "./Investor.css";

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Investor: React.FC<InvestorModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: { name?: string; email?: string; message?: string } = {};

    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required *";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name))
      newErrors.name = "Only letters are allowed *";

    // Email validation
    if (!formData.email.trim()) newErrors.email = "Email is required *";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(formData.email))
      newErrors.email = "Enter a valid email *";

    // Message validation
    if (!formData.message.trim()) newErrors.message = "Message is required *";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // stop if errors

    const to = "zadroit.development@gmail.com";
    const subject = encodeURIComponent("Investor Enquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\n\n\n\nBest regards,\n${formData.name}`
    );

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    // Reset after success
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed poppins inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-800 relative flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
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
        <div className="w-full lg:w-1/2 p-6 lg:p-10 bg-[#000] flex flex-col justify-between">
          {/* Mobile image */}
          <div className="lg:hidden md:hidden mb-6 flex justify-center">
            <img
              src={image}
              alt="Contact"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-poppins text-white mb-4">
              Investor Relations
            </h1>
            <p className="text-[#808080] leading-relaxed text-[16px] poppins font-extralight lg:text-base">
              We are not your usual marketplace, we have heard what our
              consumers want and we bring it big!
            </p>
            <p className="text-[#bfbfbf] mb-6 leading-relaxed text-[16px] poppins font-extralight lg:text-base">
              Hear us out!
            </p>

            <form className="space-y-6" onSubmit={handleClick}>
              {/* Name */}
              <div className="relative">
                <input
                  id="investor-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder=" "
                  className="w-full floating-input"
                />
                <label htmlFor="investor-name" className="floating-label">
                  Name
                </label>
                {errors.name && (
                  <p className="text-[#ffb300] text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  id="investor-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder=" "
                  className="w-full floating-input"
                />
                <label htmlFor="investor-email" className="floating-label">
                  Email Address
                </label>
                {errors.email && (
                  <p className="text-[#ffb300] text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="investor-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder=" "
                  rows={3}
                  className="w-full floating-input resize-none"
                />
                <label htmlFor="investor-message" className="floating-label">
                  Write a message
                </label>
                {errors.message && (
                  <p className="text-[#ffb300] text-xs mt-1">
                    {errors.message}
                  </p>
                )}
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

export default Investor;
