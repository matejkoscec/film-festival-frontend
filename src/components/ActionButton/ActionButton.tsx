import React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function ActionButton({ children, type = "button", onClick, className, disabled }: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white py-2 px-8 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-300 hover:opacity-70 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
