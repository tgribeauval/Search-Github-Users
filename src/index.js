// index.js is the traditional and actual entry point for all node apps.
// Here in react it just has code of what to render and where to render.

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root")); // what you want to render and where you want to render it
