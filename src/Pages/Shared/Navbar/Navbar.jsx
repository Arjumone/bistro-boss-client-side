import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [cart] = useCart()

  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <NavLink to="/">
        <li>Home</li>
      </NavLink>
      <NavLink to="/contact">
        <li>Contact Us</li>
      </NavLink>
      <NavLink to="dashBoard">
        <li>DashBoard</li>
      </NavLink>
      <NavLink to="/menu">
        <li>Our Menu</li>
      </NavLink>
      <NavLink to="/order/salad">
        <li>Order Food</li>
      </NavLink>
      <NavLink to="/">
        <li>
          <Link to="/dashboard/cart">
          <button className="btn">
            <FaShoppingCart className=" text-2xl"></FaShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
          </Link>
        </li>
      </NavLink>

      {/* {
          user? <><button onClick={handleLogOut} className=" btn btn-ghost">Sign Out</button></> 
          :
           <>
           <NavLink to="/login"><li>Login</li></NavLink>
          </>
        } */}
    </>
  );
  return (
    <div>
      <div className="navbar z-10 bg-opacity-30 bg-black text-white max-w-screen-xl fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className=" text-xl uppercase">Bistro Boss</a>
        </div>
        <div className="navbar-center sm:hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              {/* <span>{user?.displayName}</span> */}
              <button onClick={handleLogOut} className=" btn btn-ghost">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <li>Login</li>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
