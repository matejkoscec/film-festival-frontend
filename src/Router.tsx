import React from "react";

import { Route, Routes } from "react-router-dom";

import ApplicationFrame from "./pages/ApplicationFrame";
import Index from "./pages/Index/Index";
import NotFound from "./pages/NotFound/NotFound";
import Success from "./pages/Success/Success";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationFrame />}>
        <Route path="/" element={<Index />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
