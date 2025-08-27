import React, { useState } from "react";
import login from "../../assets/Login/LoginBg.png";
import logo from "../../assets/Images/logo.png";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${login})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          position: "relative",
        }}
        className="poppins"
      >
        {/* Logo on top-left */}
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "120px", // adjust as needed
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
          className="flex justify-end items-center w-full h-full px-6 md:px-30"
        >
          <div className="flex-1"></div>
          {/* Right side - Login form */}
          <div
            className="w-full sm:w-[80%] md:w-[70%] lg:w-[36%] rounded-2xl p-8 shadow-2xl border border-amber-300/30"
            style={{
              background: "rgba(0, 0, 0, 0.2)", // new
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "40px 30px",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <h2 className="text-white text-2xl font-semibold mb-6 flex flex-row justify-center">
              Create New Password
            </h2>

            <div className="space-y-4">
              {/* Password field with floating label */}
              <div className="relative w-full mt-6">
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

                {/* Eye toggle button */}
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
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      {/* Eye outline */}
                      <path d="M3 12s4-5 9-5 9 5 9 5-4 5-9 5-9-5-9-5z" />
                      {/* Diagonal slash */}
                      <line x1="4" y1="4" x2="20" y2="20" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password field with floating label */}
              <div className="relative w-full mt-6">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
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
                  Confirm New Password
                </label>

                {/* Eye toggle button */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
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
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      {/* Eye outline */}
                      <path d="M3 12s4-5 9-5 9 5 9 5-4 5-9 5-9-5-9-5z" />
                      {/* Diagonal slash */}
                      <line x1="4" y1="4" x2="20" y2="20" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mb-20">
                <button className="w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors duration-200 mt-6">
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
