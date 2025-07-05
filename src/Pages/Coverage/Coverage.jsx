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

      {/* Divider */}
      <hr className="my-10 border-dashed border-gray-400" />
       <BangladeshMap />
    </div>
  );
};

export default Coverage;
