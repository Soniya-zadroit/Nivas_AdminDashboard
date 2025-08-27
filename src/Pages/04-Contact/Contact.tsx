import React, { useState } from "react";
import image from "../../assets/Home/contact.png";
import "../10-Investor/Investor.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const handleClick = (e: any) => {
    e.preventDefault();

    let newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim()) newErrors.name = "Name is required *";
    if (!email.trim()) newErrors.email = "Email is required *";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email *";
    if (!phone.trim()) newErrors.phone = "Phone is required *";
    else if (phone.length !== 10) newErrors.phone = "Phone must be 10 digits *";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // stop if errors

    const to = "zadroit.development@gmail.com";
    const subject = encodeURIComponent("Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n\n\nBest regards,\n${name}`
    );

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    // Clear form & errors
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed poppins inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-800 relative flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - Image */}
        <div className="lg:w-1/2 md:w-1/2 hidden lg:flex items-center justify-center bg-black">
          <img src={image} alt="Contact" className="w-[90%] h-[90%] object-cover" />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 bg-[#000] flex flex-col justify-between">
          <div className="lg:hidden md:hidden mb-6 flex justify-center">
            <img src={image} alt="Contact" className="w-full h-48 object-cover rounded-lg" />
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-poppins text-[#ffb300] mb-4">Contact Us</h1>
            <p className="text-gray-300 mb-6 leading-relaxed text-[16px] lg:text-base">
              Got questions or need support? Our team is here to help you with
              orders, brands, and collaborations. Reach out and let&apos;s make
              fashion seamless for you.
            </p>

            <div className="space-y-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  className="w-full floating-input"
                />
                <label htmlFor="name" className="floating-label">
                  Name
                </label>
                {errors.name && <p className="text-[#ffb300] text-[10px] mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="w-full floating-input"
                />
                <label htmlFor="email" className="floating-label">
                  Email Address
                </label>
                {errors.email && <p className="text-[#ffb300] text-[10px] mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    if (numericValue.length <= 10) setPhone(numericValue);
                  }}
                  placeholder=" "
                  className="w-full floating-input"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                />
                <label htmlFor="phone" className="floating-label">
                  Phone Number
                </label>
                {errors.phone && <p className="text-[#ffb300] text-[10px] mt-1">{errors.phone}</p>}
              </div>

              {/* Submit */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#ffb300] text-white font-semibold py-2 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
