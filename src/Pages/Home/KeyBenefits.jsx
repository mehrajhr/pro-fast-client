import React from 'react';
import parcelTracking from '../../assets/live-tracking.png'
import safeDelivery from '../../assets/safe-delivery.png'
const benefits = [
  {
    title: 'Live Parcel Tracking',
    description:
      'Track your parcels in real-time from pick-up to delivery. Stay informed with live updates at every stage of the delivery process.',
    image: parcelTracking,
  },
  {
    title: '100% Safe Delivery',
    description:
      'We ensure secure packaging, careful handling, and verified delivery processes so your parcels are always in safe hands.',
    image: safeDelivery,
  },
  {
    title: '24/7 Call Center Support',
    description:
      'Need help? Our dedicated support team is available around the clock to assist you with any queries or delivery concerns.',
    image: safeDelivery,
  },
];

const KeyBenefits = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      {/* Top dotted border */}
      <div className="border-t border-dotted border-primary mb-10"></div>

      <div className="space-y-10">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center bg-base-100 shadow-md p-4 rounded-xl"
          >
            {/* Left: Image */}
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Middle: dotted vertical line */}
            <div className="hidden md:flex justify-center w-[2px] h-48 border-l-2 border-dotted border-primary mx-6"></div>

            {/* Right: Title & Description */}
            <div className="text-center md:text-left w-full">
              <h3 className="text-xl font-bold text-primary">{benefit.title}</h3>
              <p className="text-neutral-content mt-2">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyBenefits;
