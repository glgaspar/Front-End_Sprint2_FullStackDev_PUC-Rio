import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import NewOrder from "./pages/NewOrder";
import OrderDetail from "./pages/OrderDetail";

import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/detalhe" element={<OrderDetail />} exact />
        <Route path="/novo" element={<NewOrder />} exact />
      </Routes>
    </Router>
  )
}
