import React from 'react';
import Marquee from 'react-fast-marquee';
import brand1 from '../../assets/brands/amazon.png'
import brand2 from '../../assets/brands/amazon_vector.png'
import brand3 from '../../assets/brands/casio.png'
import brand4 from '../../assets/brands/moonstar.png'
import brand5 from '../../assets/brands/randstad.png'
import brand6 from '../../assets/brands/start-people 1.png'
import brand7 from '../../assets/brands/start.png'

const brands = [brand1 , brand2 , brand3 , brand4 , brand5 , brand6 , brand7];

const ServiceBrands = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-base-100">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Our Service Partners</h2>
      </div>
      <Marquee direction="left" speed={50} pauseOnHover gradient={false}>
        <div className="flex gap-12">
          {brands.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center min-w-[120px] mx-[100px">
              <img
                src={logo}
                alt={`Brand ${idx + 1}`}
                className="h-6 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default ServiceBrands;
