import React from "react";
import location from '../../assets/location-merchant.png'

const BeMerchent = () => {
  return (
    <div data-aos='flip-left' className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#033730] p-16 rounded-4xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={location}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-4xl font-bold">Merchant and Customer satisfaction is Our First Priority</h1>
          <p className="py-6">
          We are committed to delivering exceptional service through real-time tracking, secure delivery processes, and 24/7 dedicated support — ensuring a smooth and trustworthy experience for both merchants and their customers.
          </p>
          <button className="btn btn-primary   text-black rounded-full">Become A Merchant</button>
          <button className="btn btn-primary btn-outline rounded-full ms-4">Earn With ProFast Courier</button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchent;
