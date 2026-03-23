import { hydrate, render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("app");

if (root) {
  if (import.meta.env.DEV) {
    render(() => (
      <Router>
        <App />
      </Router>
    ), root);
  } else {
    hydrate(() => (
      <Router>
        <App />
      </Router>
    ), root);
  }
}
