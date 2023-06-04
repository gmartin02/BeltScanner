import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Scanner</Link>
        <Link to="/ninjaList">All Ninjas</Link>
        <Link to="/contact"></Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;