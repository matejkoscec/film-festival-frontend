import React from "react";

import { Route, Routes } from "react-router-dom";

import Index from "./pages/Index/Index";
import Success from "./pages/Success/Success";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<>404 not found</>} />
    </Routes>
  );
}
