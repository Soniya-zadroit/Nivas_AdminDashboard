import React from "react";
import company from "../../assets/Home/company.png";

const Company: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <img
        src={company}
        alt="Company Background"
        className="lg:w-full md:w-full w-full lg:h-auto md:h-auto h-full  min-h-screen object-cover absolute inset-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-30 flex items-center justify-end px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 lg:pt-30">
        <div className="align-middle text-center max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl">
          <h2
            className="font-agraham text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-5xl text-black "
            style={{ fontFamily: "Agraham" }}
          >
            We Are Creating a
          </h2>
          <h1 className="poppins flex flex-col gap-2  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-semibold font-poppins mt-2 sm:mt-3 lg:mt-7 md:mt-4">
            <p>Celebrity</p>
            <p> To Consumer</p>
            <p>Exclusive</p>
            <p> Marketplace</p>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Company;
