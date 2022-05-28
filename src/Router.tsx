import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cart, Purchase, Store } from "./pages";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Store />}>
        <Route path="cart" element={<Cart />} />
        <Route path="purchase" element={<Purchase />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
