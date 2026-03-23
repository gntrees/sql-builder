import { renderToString } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

export function render(url = "/") {
  return renderToString(() => (
    <Router url={url}>
      <App />
    </Router>
  ));
}
