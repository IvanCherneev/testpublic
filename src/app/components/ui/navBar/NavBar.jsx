import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavProfile from "../navProfile/NavProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/users";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " to="/">Main</Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link " to="/users">Users</Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn
            ? <NavProfile />
            : <Link className="nav-link " to="/login">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
