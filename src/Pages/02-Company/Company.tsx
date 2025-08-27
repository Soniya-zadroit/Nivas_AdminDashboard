import React from "react";
import company from "../../assets/Home/CompanyBg.png";
import companytabs from "../../assets/Home/Company_Tab.png";

const Company: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Background Images */}
      {/* Desktop Background */}
      <img
        src={company}
        alt="Company Desktop Background"
        className="hidden lg:block absolute inset-0 w-full h-[120vh] object-cover"
      />
      {/* Tablet Background */}
      <img
        src={companytabs}
        alt="Company Tab Background"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex w-full justify-end px-6 sm:px-10 lg:px-20">
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl p-6 sm:p-10 mt-20 text-right">
          <h2
            className="font-agraham w-[full] flex justify-center md:w-[100%]  text-center text-lg sm:text-2xl md:text-xl lg:text-2xl  text-black"
            style={{ fontFamily: "Agraham" }}
          >
            We Are Creating a
          </h2>
          <h1 className="poppins flex flex-col items-center gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl  text-black font-medium mt-3 sm:mt-5 lg:mt-7">
            <span>Celebrity</span>
            <span>To Consumer</span>
            <span>Exclusive</span>
            <span>Marketplace</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Company;