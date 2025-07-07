import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../Loading/Loading";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error , setError] = useState('');
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();

  const {data : parcelInfo = {} , isPending} = useQuery({
    queryKey: ['parcels', id],
    queryFn: async() =>{
        const res = await axiosSecure.get(`parcels/${id}`);
        return res.data;
    }
  })
  if(isPending){
    return <Loading></Loading>
  }
  console.log(parcelInfo);
  const amount = parcelInfo?.cost;

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const {error , paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })

    if(error){
        setError(error.message);
        console.log(error);
    }
    else{
        setError('');
         console.log(paymentMethod);
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
        {
            error && <p className="text-red-600">{error}</p>
        }
      </form>
    </div>
  );
};

export default CheckoutForm;
