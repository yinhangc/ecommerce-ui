"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";

const Payment = () => {
  const init = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    );
    console.log("stripe", stripe);
    if (!stripe) return;
    const fetchClientSecret = async () => {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
      });
      const { clientSecret } = await response.json();
      return clientSecret;
    };
    const checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret,
    });
    checkout.mount("#stripe-checkout");
  };

  useEffect(() => {
    init();
  }, []);

  return <div id="stripe-checkout"></div>;
};

export default Payment;
