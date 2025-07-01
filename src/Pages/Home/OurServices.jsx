import React from 'react';
import { FaBuilding, FaGlobeAsia, FaUndo } from 'react-icons/fa';
import { FaBoxesPacking, FaMoneyBillWave, FaTruckFast } from 'react-icons/fa6';

const services = [
  {
    icon: <FaTruckFast className="text-3xl text-primary" />,
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: <FaGlobeAsia className="text-3xl text-primary" />,
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: <FaBoxesPacking className="text-3xl text-primary" />,
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: <FaMoneyBillWave className="text-3xl text-primary" />,
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: <FaBuilding className="text-3xl text-primary" />,
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: <FaUndo className="text-3xl text-primary" />,
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  }
];

const OurServices = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-base-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary">Our Services</h2>
        <p className="mt-2 text-lg text-neutral-content max-w-2xl mx-auto">
          Explore our fast and reliable delivery solutions tailored to meet your business needs across Bangladesh.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="card bg-base-200  shadow-xl text-center hover:shadow-primary transition-shadow duration-300">
            <div className="card-body flex flex-col justify-center items-center">
              <div className="mb-4">{service.icon}</div>
              <h3 className="card-title text-xl text-primary">{service.title}</h3>
              <p className="text-sm text-neutral-content">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
