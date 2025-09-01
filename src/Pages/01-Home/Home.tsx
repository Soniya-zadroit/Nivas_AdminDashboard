import React from "react";
import homebg from "../../assets/Home/HomeBg.png";
import Company from "../02-Company/Company";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import homeTab from "../../assets/Home/HomeTab.png";
import axios from "axios";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const getStart = async () => {
    try {
      await axios
        .post(
          import.meta.env.VITE_API_URL + "/brand/brandRegistration/getStatus",
          {
            applicationId: sessionStorage.getItem("applicationId"),
          },

          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response: any) => {
          const data = response.data.data;
          const status = data.applicationStatus;
          navigate("/brandregistration", { state: status });
        });
    } catch (error) {
      console.log("Home.tsx / error / 16 -------------------  ", error);
    }
  };

  return (
    <>
      <div
        className="home-scroll-container h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        <section className="relative w-full h-screen snap-start overflow-hidden">
          {/* Background Images */}
          {/* Desktop Background */}
          <img
            src={homebg}
            alt="Home Background"
            className="hidden lg:block absolute inset-0 w-full h-[120vh] object-cover"
          />
          {/* Tablet Background */}
          <img
            src={homeTab}
            alt="Home Tab Background"
            className="block lg:hidden absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0">
            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 sm:px-6 md:px-12 lg:p-20 text-left">
              {/* Main heading */}
              <h1
                className="text-[25px] md:text-[40px] lg:text-[50px] mt-30 font-400 text-black leading-tight"
                style={{ fontFamily: "Agraham" }}
              >
                <div className="flex flex-col gap-7 sm:gap-7 md:gap-9 lg:gap-10">
                  <p>Style,</p>
                  <p>Signed by</p>
                  <p>Stardom</p>
                </div>
              </h1>

              {/* Subtitle */}
              <p className="flex flex-col gap-3 mt-4 sm:mt-6 text-[clamp(1.2rem,1.3vw,1.2rem)] text-black max-w-[70%] sm:max-w-md md:max-w-lg lg:max-w-[40%] font-400 font-poppins">
                <span className="poppins">
                  Join an exclusive marketplace where your
                </span>
                <span className="poppins">brand takes center stage.</span>
              </p>

              {/* Button */}
              <button
                className="
                  flex flex-row items-center justify-center gap-10 
                  mt-5 mb-5 px-6 py-2 sm:px-8 sm:py-2 
                  w-[70%] sm:w-[40%] md:w-[50%] lg:w-[23%]
                  bg-[#e17603] text-white font-semibold rounded-full 
                  shadow-lg hover:bg-[#d6a518] transition 
                  text-sm sm:text-base poppins cursor-pointer
                "
                onClick={() => {
                  getStart();
                }}
              >
                Get Started <FaAngleRight className="ml-1 mt-[2px]" />
              </button>
            </div>
          </div>
        </section>

        <section className="h-screen snap-start" id="company">
          <Company />
        </section>
      </div>
    </>
  );
};

export default Home;
