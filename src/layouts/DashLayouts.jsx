import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Pages/Shared/Logo/Logo";
import {
  FiHome,
  FiPackage,
  FiCreditCard,
  FiSearch,
  FiUser,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const DashLayouts = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">
          <Logo></Logo>
        </NavLink>
      </li>
      <li>
        <NavLink>
          <FiHome className="inline mr-2" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="myParcels">
          <FiPackage className="inline mr-2" /> My Parcels
        </NavLink>
      </li>
      <li>
        <NavLink to="transactionHistory">
          <FiCreditCard className="inline mr-2" /> Trnasaction History
        </NavLink>
      </li>
      <li>
        <NavLink to="track">
          <FiSearch className="inline mr-2" /> Track a Package
        </NavLink>
      </li>
      <li>
        <NavLink>
          <FiUser className="inline mr-2" /> Update Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="pending-riders">
          <FiClock className="inline mr-2" /> Pending Riders
        </NavLink>
      </li>
      <li>
        <NavLink to="active-riders">
          <FiCheckCircle className="inline mr-2" /> Active Riders
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {links}
        </ul>
      </div>
    </div>
  );
};

export default DashLayouts;
