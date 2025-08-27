import React, { useState } from "react";
import login from "../../assets/Login/LoginBg.png";
import logo from "../../assets/Images/logo.png";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "120vh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "120px",
        }}
      />

      {/* Main content */}
      <div
        className="flex justify-end items-center w-full h-full px-6 md:px-12"
        style={{ flex: 1 }}
      >
        {/* Login Form */}
        <div
          className="w-full sm:w-[80%] md:w-[70%] lg:w-[36%] rounded-2xl p-8 shadow-2xl border border-amber-300/30"
          style={{
            background: "rgba(0, 0, 0, 0.2)", // transparent black overlay
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)", // for Safari
            color: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            borderRadius: "15px",
            padding: "40px 30px",
          }}
        >
          <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6 text-center m-2">
            Let’s Get you Signed In!
          </h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="peer w-full px-1 pt-7 pb-2 rounded-md bg-transparent border-b border-b-white text-white
                  focus:outline-none focus:border-amber-200 focus:ring-0 transition-all duration-200"
              />
              <label
                htmlFor="email"
                className="absolute left-1 top-2 text-white text-sm transition-all duration-200 
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-sm
                  peer-focus:top-2 peer-focus:text-amber-200 peer-focus:text-sm"
              >
                Email address
              </label>
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                className="peer w-full px-1 pt-7 pb-2 rounded-md bg-transparent border-b border-b-white text-white
                  focus:outline-none focus:border-amber-200 focus:ring-0 transition-all duration-200 pr-12"
              />
              <label
                htmlFor="password"
                className="absolute left-1 top-2 text-white text-sm transition-all duration-200 
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-sm
                  peer-focus:top-2 peer-focus:text-amber-200 peer-focus:text-sm"
              >
                Password
              </label>

              {/* Eye button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 
                      12 5c4.478 0 8.268 2.943 9.542 7-1.274 
                      4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
                      0-8.268-2.943-9.543-7a9.97 
                      9.97 0 011.563-3.029m5.858.908a3 
                      3 0 114.243 4.243M9.878 
                      9.878l4.242 4.242M9.878 
                      9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Continue button */}
            <button className="w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors duration-200">
              Continue
            </button>

            {/* Terms */}
            <div className="flex items-start gap-2 mt-3 mb-5">
              <svg
                className="w-4 h-4 text-amber-100/90 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-amber-100/90 text-[10px]">
                By clicking continue, you are agreeing to our{" "}
                <span className="text-white underline cursor-pointer hover:text-amber-200 transition-colors">
                  Terms and Conditions
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
