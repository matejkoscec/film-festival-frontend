import React from "react";

import { ErrorResponse } from "../../api/survey/types";

type LoadingErrorProps = {
  error: ErrorResponse;
};

export default function LoadingError({ error }: LoadingErrorProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">{error.errors.map((err) => err.detail).join(" ")}</h1>
      <button onClick={() => window.location.reload()}>Reload page</button>
    </div>
  );
}
