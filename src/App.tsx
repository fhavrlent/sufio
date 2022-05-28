import { Router } from "./Router";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store";

export const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
