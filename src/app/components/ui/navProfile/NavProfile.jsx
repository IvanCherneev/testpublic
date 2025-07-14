import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  if (!currentUser) return "Loading";

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=""
          className="img-responsive rounded-circle"
          height={40}
        />
      </div>
      <div className={`w-100 dropdown-menu ${isOpen ? "show" : ""}`}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
        <Link to="/logout" className="dropdown-item">LogOut</Link>
      </div>
    </div>
  );
};

export default NavProfile;
