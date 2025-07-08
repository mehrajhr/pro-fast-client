import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${id}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading></Loading>;
  }
  console.log(parcelInfo);
  const amount = parcelInfo?.cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log(error);
    } else {
      setError("");
      console.log(paymentMethod);
    }

    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents,
    });

    console.log(data);

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Customer Name",
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Save order/payment data to DB
        const paymentInfo = {
          transactionId: result.paymentIntent.id,
          amount: amountInCents,
          email: user?.email,
          parcelId: parcelInfo._id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        await axiosSecure.post("/payments", paymentInfo).then((res) => {
          setError("");
          setSuccess("Payment successful!");
        });
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-10 bg-white my-10 border rounded"
      >
        <CardElement className="p-3 border-2 border-orange-500 rounded"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className="mt-4 btn btn-primary text-black"
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
