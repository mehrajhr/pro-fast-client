import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import warehouseData from "../../../data/warehouses.json";
import useAuth from "../../hooks/useAuth";
import rider from "../../assets/agent-pending.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySwal = withReactContent(Swal);

const BeARider = () => {
  const { user } = useAuth();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");
  const selectedDistrict = watch("district");

  useEffect(() => {
    const uniqueRegions = [
      ...new Set(warehouseData.map((item) => item.region)),
    ];
    setRegions(uniqueRegions);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const regionDistricts = [
        ...new Set(
          warehouseData
            .filter((item) => item.region === selectedRegion)
            .map((item) => item.district)
        ),
      ];
      setDistricts(regionDistricts);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedDistrict) {
      const districtCities = [
        ...new Set(
          warehouseData
            .filter((item) => item.district === selectedDistrict)
            .map((item) => item.city)
        ),
      ];
      setCities(districtCities);
    }
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    console.log(data);

    const riderInfo = {
      ...data,
      name: user.displayName,
      email : user.email,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    axiosSecure
      .post("/riders", riderInfo)
      .then((res) => {
        if (res.data.insertedId) {
          MySwal.fire({
            title: "Application Submitted!",
            text: "Your rider application has been received.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-10 max-w-5xl mx-auto mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Be a Rider</h2>
          <p className="mb-6 text-gray-600 max-w-sm">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("name")}
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              <input
                {...register("age", { required: true })}
                type="number"
                className="input input-bordered w-full"
                placeholder="Your Age"
              />
              <input
                {...register("email")}
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full"
                placeholder="Your Email"
              />
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <input
                {...register("nid", { required: true })}
                className="input input-bordered w-full"
                placeholder="NID Number"
              />
              <input
                {...register("contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact Number"
              />
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <select
                {...register("city", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Warehouse</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                {...register("bike_type", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Bike Type</option>
                <option value="motorbike">Motorbike</option>
                <option value="scooter">Scooter</option>
                <option value="electric">Electric Bike</option>
              </select>
            </div>
            <button className="btn btn-primary text-black">Submit</button>
          </form>
        </div>
        <div>
          <img src={rider} alt="Rider Illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
