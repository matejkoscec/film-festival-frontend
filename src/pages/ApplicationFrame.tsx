import React from "react";

import { Outlet } from "react-router-dom";

import bgBlobSrc from "../../assets/blob-scene-haikei.jpg";

export default function ApplicationFrame() {
  return (
    <>
      <img src={bgBlobSrc} alt="" className="fixed select-none min-h-screen" />
      <Outlet />
    </>
  );
}
