import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link " to="/">Main</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/users">Users</Link>
      </li>
    </ul>
  );
};

export default NavBar;
