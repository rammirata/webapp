import React from "react";

const Button = ({ icon, text, border }) => {
  return (
    <div
      className={`flex px-4 py-2 rounded-full analyse-btn justify-center items-center gap-2.5 ${
        border ? "border-2 border-mint-green-500" : ""
      } active:scale-[0.99] transition-all duration-50 cursor-pointer`}
    >
      <div>
        <img src={icon} alt="chart_vector" className="w-5 h-5" />
      </div>
      <div>
        <span
          className={`text-[16px] whitespace-nowrap font-[700]  ${
            border ? "text-mint-green-500" : "text-[#F9F9F9]"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Button;
