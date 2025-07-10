import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: activeRiders = [] , refetch } = useQuery({
    queryKey: ["approved-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/status/${id}`, { status: "rejected" }).then(() => {
          Swal.fire("Rejected!", "Rider has been rejected.", "success");
          refetch(); // refetch approved riders
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUserCheck className="text-green-600" /> Active Riders (
        {activeRiders.length})
      </h2>
      <div className="overflow-x-auto rounded-xl shadow bg-base-100">
        <table className="table table-zebra table-md">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>City</th>
              <th>Bike</th>
              <th>Age</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>{rider.city}</td>
                <td>{rider.bike_type}</td>
                <td>{rider.age}</td>
                <td>{rider.status}</td>
                <td>
                  <button
                    onClick={() => handleReject(rider._id)}
                    className="btn btn-sm btn-erro flex gap-2"
                  >
                    <span>❌</span> <span>Reject</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
