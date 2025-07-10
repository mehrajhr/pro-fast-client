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
import TransactionHistory from "../Pages/DashBoard/TransactionHistory";
import TrackParcel from "../Pages/DashBoard/TrackParcel";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/DashBoard/PendingRiders";
import ActiveRiders from "../Pages/DashBoard/ActiveRiders";

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
      },
      {
        path : 'beARider',
        element : <PrivateRoutes><BeARider></BeARider></PrivateRoutes>
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
      },
      {
        path: 'transactionHistory',
        Component: TransactionHistory
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path: 'pending-riders',
        Component: PendingRiders
      },
      {
        path: 'active-riders',
        Component: ActiveRiders
      }
    ]
  }
]);