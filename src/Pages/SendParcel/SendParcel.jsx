import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import warehouseData from "../../../data/warehouses.json"; // Replace with your warehouse data source
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySwal = withReactContent(Swal);

// utils/generateTrackingId.js

function generateTrackingId(prefix = "TRK") {
  const timestamp = Date.now().toString(36); // base36 timestamp
  const random = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4-char random
  return `${prefix}-${timestamp}-${random}`;
}

const SendParcel = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [regions, setRegions] = useState([]);
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [parcelType, setParcelType] = useState("document");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const uniqueRegions = [...new Set(warehouseData.map((w) => w.region))];
    setRegions(uniqueRegions);
  }, []);

  const handleRegionChange = (region, isSender = true) => {
    const filtered = warehouseData.filter((w) => w.region === region);
    const districts = [...new Set(filtered.map((w) => w.district))];
    if (isSender) setSenderDistricts(districts);
    else setReceiverDistricts(districts);
  };

  const calculateCost = (data) => {
    const senderDistrict = data.senderDistrict;
    const receiverDistrict = data.receiverDistrict;
    const type = data.type;
    const weight = parseFloat(data.weight) || 0;
    const isSameDistrict = senderDistrict === receiverDistrict;

    let cost = 0;
    let breakdown = [];

    if (type === "document") {
      cost = isSameDistrict ? 60 : 80;
      breakdown.push(`Parcel Type: Document`);
      breakdown.push(
        `Delivery Area: ${
          isSameDistrict ? "Within City - ৳60" : "Outside City - ৳80"
        }`
      );
    } else {
      breakdown.push(`Parcel Type: Non-Document`);
      if (weight <= 3) {
        cost = isSameDistrict ? 110 : 150;
        breakdown.push(`Weight: ${weight}kg (Up to 3kg)`);
        breakdown.push(
          `Delivery Area: ${
            isSameDistrict ? "Within City - ৳110" : "Outside City - ৳150"
          }`
        );
      } else {
        const extraWeight = weight - 3;
        cost = isSameDistrict
          ? 110 + extraWeight * 40
          : 150 + extraWeight * 40 + 40;
        breakdown.push(`Weight: ${weight}kg (>3kg)`);
        breakdown.push(
          `Extra Cost: ৳${extraWeight * 40}${
            !isSameDistrict ? " + ৳40 (Outstation Surcharge)" : ""
          }`
        );
        breakdown.push(`Base Delivery: ${isSameDistrict ? "৳110" : "৳150"}`);
      }
    }

    breakdown.push(`Total Cost: ৳${cost}`);
    return { cost, breakdown };
  };

  const onSubmit = (data) => {
    const { cost, breakdown } = calculateCost(data);

    MySwal.fire({
      title: "Delivery Cost Breakdown",
      html: (
        <div className="text-left">
          {breakdown.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      ),
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Keep Editing",
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate DB save here
        const parcelData = {
          ...data,
          cost,
          created_by: user.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          tracking_id: generateTrackingId(),
          creation_date: new Date().toISOString(),
        };
        console.log("Saved parcel data:", parcelData);
        axiosSecure
          .post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              MySwal.fire(
                "Success!",
                `Your parcel has been submitted. Total Cost: ৳${cost}`,
                "success"
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
        reset();
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Send a Parcel</h2>
      <p className="text-gray-600 mb-6 text-center">
        As the system is based on Door to Door delivery, Parcel needs both
        pickup and delivery location.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="border p-4 rounded-md bg-base-100 shadow">
          <h3 className="text-xl font-semibold mb-2">Parcel Info</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <label className="label">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type")}
                    defaultChecked
                    onChange={() => setParcelType("document")}
                  />{" "}
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type")}
                    onChange={() => setParcelType("non-document")}
                  />{" "}
                  Non-Document
                </label>
              </div>
            </div>
            <div className="flex-1">
              <label className="label">Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Parcel title"
              />
            </div>
            {parcelType === "non-document" && (
              <div className="flex-1">
                <label className="label">Weight (kg)</label>
                <input
                  {...register("weight")}
                  type="number"
                  step="0.1"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="Parcel weight"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="border p-4 rounded-md bg-base-100 shadow">
            <h3 className="text-xl font-semibold mb-2">Sender Info</h3>
            <input
              {...register("senderName", { required: true })}
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Sender Name"
            />
            <input
              {...register("senderContact", { required: true })}
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Contact Number"
            />
            <select
              {...register("senderRegion", { required: true })}
              className="select select-bordered w-full mb-3"
              onChange={(e) => handleRegionChange(e.target.value, true)}
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              {...register("senderDistrict", { required: true })}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select Service Center</option>
              {senderDistricts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              {...register("senderAddress", { required: true })}
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Pickup Address"
            />
            <input
              {...register("senderInstruction", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Pickup Instructions"
            />
          </div>

          {/* Receiver Info */}
          <div className="border p-4 rounded-md bg-base-100 shadow">
            <h3 className="text-xl font-semibold mb-2">Receiver Info</h3>
            <input
              {...register("receiverName", { required: true })}
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Receiver Name"
            />
            <input
              {...register("receiverContact", { required: true })}
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Contact Number"
            />
            <select
              {...register("receiverRegion", { required: true })}
              className="select select-bordered w-full mb-3"
              onChange={(e) => handleRegionChange(e.target.value, false)}
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              {...register("receiverDistrict", { required: true })}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select Service Center</option>
              {receiverDistricts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              {...register("receiverAddress", { required: true })}
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Delivery Address"
            />
            <input
              {...register("receiverInstruction", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Delivery Instructions"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
