import React from "react";
import { TailSpin } from "react-loader-spinner";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    severity?: "primary" | "secondary" | "danger";
    size?: "base" | "small";
    isLoading?: boolean;
  }
> = ({
  fullWidth = true,
  severity = "primary",
  size = "base",
  isLoading = false,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={` 
          ${fullWidth ? "w-full" : "sm:min-w-[220px] "}
          px-6 py-3 rounded-md  flex items-center justify-center border-[#ef6c35] ${
            severity == "primary" ? "bg-[#ef6c35]" : "bg-transparent"
          } border-[1px]   duration-200 ease-in font-semibold flex items-center justify-center disabled:bg-[#353535] disabled:border-[#d6d6d64f] disabled:text-gray-500
          ${size === "small" ? "sm:text-sm text-xs" : "sm:text-base text-sm"}
          `}
      >
        {isLoading ? (
          <TailSpin
            visible={true}
            height="28"
            width="28"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          props.children
        )}
      </button>
    </>
  );
};

export default Button;
