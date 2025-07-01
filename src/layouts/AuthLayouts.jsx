import React from "react";
import { Outlet } from "react-router";
import Logo from "../Pages/Shared/Logo/Logo";
import authImage from '../assets/authImage.png'

const AuthLayouts = () => {
  return (
    <div className="bg-base-200 p-14">
      <div>
        <Logo></Logo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse mt-5">
        <div className="flex-1">
          <img
            src={authImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
