import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: pendingRiders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDecision = (riderId, decision , email) => {
    const actionText = decision === "approved" ? "Approve" : "Reject";

    Swal.fire({
      title: `${actionText} this rider?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/riders/status/${riderId}`, { status: decision , email})
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: `Successfully ${
                  decision === "approved" ? "Approved" : "Rejected"
                }!`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Pending Rider Applications
      </h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Bike</th>
              <th>District</th>
              <th>City</th>
              <th>NID</th>
              <th>Age</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-500">
                  No pending riders
                </td>
              </tr>
            ) : (
              pendingRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.bike_type}</td>
                  <td>{rider.district}</td>
                  <td>{rider.city}</td>
                  <td>{rider.nid}</td>
                  <td>{rider.age}</td>
                  <td>{new Date(rider.created_at).toLocaleString()}</td>
                  <td className="space-x-2 flex gap-3">
                    <button
                      onClick={() => handleDecision(rider._id, "approved" , rider.email)}
                      className="btn btn-sm btn-success tooltip"
                      data-tip="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDecision(rider._id, "rejected" , rider.email)}
                      className="btn btn-sm btn-error tooltip"
                      data-tip="Reject"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
