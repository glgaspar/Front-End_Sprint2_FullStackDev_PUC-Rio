import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import NewOrder from "./pages/NewOrder";
import OrderDetail from "./pages/OrderDetail";
import Login from "./components/Login/Login";

import Navbar from "./components/Navbar/Navbar";

export default function App() {
  
  const Private = ({Item}) => {
    const signed = JSON.parse(sessionStorage.getItem('user'));

    return signed !== null ? Item  : <Login /> 
}


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Private Item={<Home />} />} exact />
        <Route path="/home" element={<Private Item={<Home />} />} exact />
        <Route path="/detalhe" element={<Private Item={<OrderDetail />} />} exact />
        <Route path="/novo" element={<Private Item={<NewOrder />} />} exact />
      </Routes>
    </Router>
  )
}
