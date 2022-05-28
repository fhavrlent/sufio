import { Provider } from "react-redux";

import { Router } from "./Router";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

export const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
