import React from "react";
import homebg from "../../assets/Home/Homebg.jpg";
import Company from "../02-Company/Company";
import { PiGreaterThan } from "react-icons/pi";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="relative w-full min-h-screen lg:h-[100vh] ">
          {/* Background Image */}
          <img
            src={homebg}
            alt="Home Background"
            className="w-full h-[140vh]  object-cover absolute inset-0"
          />

          {/* Overlay */}
          <div className="absolute inset-0 ">
            {" "}
            {/* slight overlay for readability */}
            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 sm:px-6 md:px-12 lg:px-10 text-left">
              {/* Main heading */}
              <h1
                className="text-[25px] md:text-[40px] lg:text-[60px] mt-30 font-400 text-black leading-tight"
                style={{ fontFamily: "Agraham" }}
              >
                <div className="flex flex-col gap-7 sm:gap-7 md:gap-9 lg:gap-10">
                  <p>Style,</p>
                  <p>Signed by</p>
                  <p>Stardom</p>
                </div>
              </h1>

              {/* Subtitle */}
              <p className="flex flex-col gap-3  mt-4 sm:mt-6 text-[clamp(1.2rem,1.3vw,1.2rem)] text-black max-w-[70%] sm:max-w-md md:max-w-lg lg:max-w-[40%] font-400  font-poppins">
                <p className="poppins">
                  {" "}
                  Join an exclusive marketplace where your{" "}
                </p>
                <p className="poppins">brand takes center stage.</p>
              </p>

              {/* Button */}
              <button
                className="
    flex flex-row items-center justify-center gap-10 
    mt-5 mb-5 px-6 py-2 sm:px-8 sm:py-2 
    w-[70%] sm:w-[40%] md:w-[50%] lg:w-[23%]
    bg-[#e4b21a] text-white font-semibold rounded-full 
    shadow-lg hover:bg-[#d6a518] transition 
    text-sm sm:text-base poppins
  "
                onClick={() => {
                  navigate("/brandregistration");
                }}
              >
                Get Started <FaAngleRight className="ml-1 mt-[2px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Section */}
      {/* <div id="company">
        <Company />
      </div> */}
    </>
  );
};

export default Home;
