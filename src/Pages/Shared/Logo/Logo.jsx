import React from 'react';
import logo from '../../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='font-extrabold text-3xl -ml-3'>ProFast</p>
        </div>
    );
};

export default Logo;