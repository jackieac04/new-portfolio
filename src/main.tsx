import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import "tailwindcss/tailwind.css";
// import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      {/* <ChakraProvider> */}
      <App />
      {/* </ChakraProvider> */}
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
