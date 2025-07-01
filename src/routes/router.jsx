import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts, 
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
]);