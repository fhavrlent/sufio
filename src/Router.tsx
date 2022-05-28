import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Cart, Order, Products } from "./pages";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  </BrowserRouter>
);
