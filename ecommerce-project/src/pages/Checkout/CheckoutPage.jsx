import "./CheckoutPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./checkoutHeader.jsx";
import { OrderSummary } from "./OrderSummary.jsx";
import { PaymentSummary } from "./PaymentSummary.jsx";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
      const fetchPaymentSummary = async () => {
        const response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);

  useEffect(() => {
    const fetchCheckoutEstimatedTime = async () => {
      const response=  await axios .get("/api/delivery-options?expand=estimatedDeliveryTime");
        setDeliveryOptions(response.data);
      };
    fetchCheckoutEstimatedTime();
  }, []);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}
