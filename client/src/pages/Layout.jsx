import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1 className="text-8xl tracking-tighter text-balance">Layout</h1>
      <Outlet />;
    </div>
  );
}

export default Layout;
