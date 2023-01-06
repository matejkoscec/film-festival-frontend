import React from "react";

import { useNavigate } from "react-router-dom";

import notFoundSrc from "../../../assets/404.svg";
import ActionButton from "../../components/ActionButton/ActionButton";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden pb-10">
      <img src={notFoundSrc} alt="" className="h-52" />
      <h1 className="text-3xl font-semibold my-10">Page not found</h1>
      <ActionButton onClick={() => navigate("/")} className="mt-10">
        Go to home page
      </ActionButton>
    </div>
  );
}
