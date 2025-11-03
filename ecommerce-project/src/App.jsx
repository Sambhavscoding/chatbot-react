import {Routes, Route} from "react-router";
import { useEffect, useState } from "react";
import { HomePage } from './pages/Home/homepage.jsx'
import { CheckoutPage } from './pages/Checkout/CheckoutPage.jsx' 
import './App.css'
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import { TrackingPage } from "./pages/TrackingPage.jsx";
import axios from "axios";

function App() {
  const[cart, setCart]=useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    }

    fetchCartItems();
  },[]);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
       <Route path="orders" element={<OrdersPage cart={cart}/>} />

       <Route path="tracking" element={<TrackingPage/>} />
    </Routes>
      
  )
}

export default App
