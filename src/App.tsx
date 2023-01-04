import React from "react";

import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import ClientProvider from "./components/ClientProvider/ClientProvider";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ClientProvider>
        <Router />
      </ClientProvider>
    </BrowserRouter>
  );
}

export default App;
