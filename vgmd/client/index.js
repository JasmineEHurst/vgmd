import React from "react";
import ReactDOM from "react-dom";
import RouteList from "./routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  // <BrowserRouter>
  <RouteList />,
  // </BrowserRouter>
  document.getElementById("root")
);
