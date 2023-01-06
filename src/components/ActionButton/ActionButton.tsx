import React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function ActionButton({ children, type = "button", onClick, className }: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-8 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}
