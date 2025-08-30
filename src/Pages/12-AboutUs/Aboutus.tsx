import React, { useState } from "react";
import { X } from "lucide-react";
import image from "../../assets/Home/About.png";
import "../10-Investor/Investor.css";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Aboutus: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed comfortaa inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl w-full max-w-4xl h-[80vh] overflow-hidden 
             shadow-[5px_5px_10px_rgba(255,179,0,0.6),10px_10px_5px_rgba(0,0,0,0.9)] 
             border-b border-l border-[#58451a] relative flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - Image */}
        <div className="lg:w-1/2 md:w-1/2 hidden lg:flex items-center justify-center ">
          <img
            src={image}
            alt="Contact"
            className="w-[100%] h-[100%] object-cover"
          />
        </div>

        {/* Right side - Text */}
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
            <h1 className="text-2xl lg:text-5xl comfortaa text-[#ffb300] mb-20">
              About Us
            </h1>
            <p className="text-[#fff] mb-4  leading-relaxed text-[16px] comfortaa font-light lg:text-base">
              Nivas inc. 1991 since has been the forerunner of on-demand and
              sustainable fashion in retail & enterprise industries.
            </p>
            <p className="text-[#fff] mb-8  leading-relaxed text-[16px] comfortaa font-light lg:text-base">
              Our company aims to cater to consumers of all preferences, through
              our global outreach & network, we maintain their quality goals.
              Today, we are working with large retail labels & enterprise
              customers such as airlines, schools and hospitals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
