import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import { FaEye, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  console.log(parcels);
  const onView = (parcel) => {};
  const onDelete = async (id, refetch) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this parcel?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e53935",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/parcels/${id}`
        );

        console.log(res.data);

        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "The parcel has been deleted.", "success");
          refetch(); // Refetch parcels if using React Query or reload state
        } else {
          Swal.fire(
            "Error",
            "Failed to delete parcel. Please try again.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire("Error", "Something went wrong. Try again later.", "error");
    }
  };

  const onPay = (id) => {
    navigate(`/dashBoard/payment/${id}`);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost (৳)</th>
              <th>Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{parcel.tracking_id}</td>
                <td className="font-medium">{parcel.title}</td>
                <td className="capitalize">{parcel.type}</td>
                <td>
                  {moment(parcel.creation_date).format(
                    "MMM D, YYYY , h:mm:ss a"
                  )}
                </td>
                <td className="font-semibold">{parcel.cost}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      parcel.payment_status === "paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => onView(parcel)}
                    className="btn btn-sm btn-outline btn-info"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onDelete(parcel._id, refetch)}
                    className="btn btn-sm btn-outline btn-error"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                  {parcel.payment_status !== "paid" && (
                    <button
                      onClick={() => onPay(parcel._id)}
                      className="btn btn-sm btn-outline btn-success"
                      title="Pay Now"
                    >
                      <FaMoneyCheckAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-8">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
