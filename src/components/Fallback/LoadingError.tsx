import React from "react";

import bugFixSrc from "../../../assets/bug-fix.svg";
import { ErrorResponse } from "../../api/survey/types";
import ActionButton from "../ActionButton/ActionButton";

type LoadingErrorProps = {
  error: ErrorResponse;
};

export default function LoadingError({ error }: LoadingErrorProps) {
  return (
    <div className="flex flex-col items-center relative overflow-hidden gap-10">
      <h1 className="text-2xl font-semibold text-center">{error.errors.map((err) => err.detail).join(" ")}</h1>
      <img src={bugFixSrc} alt="" className="w-96" />
      <ActionButton onClick={() => window.location.reload()}>Reload page</ActionButton>
    </div>
  );
}
