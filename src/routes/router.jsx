import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashLayouts from "../layouts/DashLayouts";
import MyParcels from "../Pages/DashBoard/MyParcels";
import Payment from "../Pages/DashBoard/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts, 
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage',
        Component: Coverage
      },
      {
        path: '/sendParcel',
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayouts,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashBoard',
    element: <PrivateRoutes><DashLayouts></DashLayouts></PrivateRoutes>,
    children: [
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path: 'payment/:id',
        Component: Payment
      }
    ]
  }
]);