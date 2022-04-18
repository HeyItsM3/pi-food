import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById("root")
);
