import React from "react";

const Button = ({ children, className }) => {
  return (
    <div
      className={`flex justify-center items-center text-black bg-[#efefef] hover:bg-[#e2e2e2] px-4 py-2 rounded-full cursor-pointer ${className}`}
    >
      <p className="text-md font-semibold">{children}</p>
    </div>
  );
};

export default Button;
