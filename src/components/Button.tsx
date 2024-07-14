import React from "react";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    severity?: "primary" | "secondary" | "danger";
    size?: "base" | "small";
  }
> = ({ fullWidth, severity = "primary", size = "base", ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`w-full py-3 rounded-md text-base hover:scale-y-105 flex items-center justify-center border-[#e8eaa1] border-[1px]   duration-200 ease-in font-semibold`}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
