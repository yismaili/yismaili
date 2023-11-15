import { createBrowserRouter, Outlet} from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/body/Home";

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
    ],
  },
]);
