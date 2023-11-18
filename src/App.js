import "./App.css";
import { Outlet, RouterProvider } from "react-router-dom";
import { routers } from "./routes/routes";
import "./i18n";
import { OutroProvider } from "./Provider/OutroProvider";

function App() {
  return (
    <OutroProvider>
      <RouterProvider router={routers}>
        <Outlet />
      </RouterProvider>
    </OutroProvider>
  );
}

export default App;

