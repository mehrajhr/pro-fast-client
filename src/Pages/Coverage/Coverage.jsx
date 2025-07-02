import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import BangladeshMap from './BangladeshMap';

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="py-10 px-4 md:px-8 lg:px-20 rounded-lg">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-8">
        We are available in 64 districts
      </h2>

      {/* Search Box */}
      <div className="max-w-xl mx-auto flex items-center rounded-full overflow-hidden shadow-md border border-gray-200">
        <div className="px-4 text-gray-500 text-xl">
          <FiSearch />
        </div>
        <input
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 py-3 px-2 outline-none"
        />
        <button className="bg-lime-400 hover:bg-lime-500 text-white font-semibold px-6 py-2 rounded-full mr-2 transition duration-300">
          Search
        </button>
      </div>

      {/* Divider */}
      <hr className="my-10 border-dashed border-gray-400" />

      {/* Subheading */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center">
        We deliver almost all over Bangladesh
      </h3>

       <BangladeshMap />
    </div>
  );
};

export default Coverage;
