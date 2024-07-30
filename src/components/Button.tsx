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
        className={`w-full ${
          severity == "primary" ? "py-3" : "py-[6px]"
        } rounded-md text-base flex items-center justify-center border-[#ef6c35] ${
          severity == "primary" ? "bg-[#ef6c35]" : "bg-transparent"
        } border-[1px]   duration-200 ease-in font-semibold`}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
