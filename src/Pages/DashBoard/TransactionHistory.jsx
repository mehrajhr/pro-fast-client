import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments" , user?.email],
    queryFn: async() => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load transactions
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={txn._id}>
                <td>{index + 1}</td>
                <td className="text-sm break-all">{txn.parcelId}</td>
                <td className="text-sm break-all">{txn.transactionId}</td>
                <td>${txn.amount / 100}</td>
                <td>{new Date(txn.createdAt).toLocaleString()}</td>
                <td className="text-sm">{txn.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
