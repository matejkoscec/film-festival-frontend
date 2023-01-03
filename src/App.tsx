import React from "react";

import { BrowserRouter } from "react-router-dom";

import Router from "./Router";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Router />
    </BrowserRouter>
  );
}

export default App;
