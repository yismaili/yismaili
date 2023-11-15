import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Home from "../components/body/Home";
import Admin from "../components/admin";
import Contact from "../components/body/Contact";
import Header from "../components/Header/Header";
import About from "../components/body/About";
import Work from "../components/body/Work";
import Dashboard from "../components/admin/dashboard";
import PrivateRoutes from "./Private/PrivateRoutes";
import Blog from "../components/blog/Blog";
import Blogs from "../components/blog/Blogs";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/work",
        element: <Work />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "*", // Wildcard route to catch any other paths
        element: <Navigate to="/" />, // Redirect to the 404 page
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes Component={Dashboard} />,
  },
  {
    path: "/ma-admin",
    element: <Admin />,
  },
  {
    path: "/404", // Define a specific path for the 404 page
    element: <Home />,
  },
]);
