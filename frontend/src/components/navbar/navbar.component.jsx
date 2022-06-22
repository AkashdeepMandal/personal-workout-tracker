import React from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar.style.css";

function Navbar() {
  return (
    <Fragment>
      <div className="navigation">
        <div className="nav-links-container">
          <Link className="logo-container" to="/">
            Personal Workout Tracker
          </Link>
          <Link className="nav-link" to="/trainer">
            Trainer
          </Link>
          <Link className="nav-link" to="/workout">
            Workout
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
        <div className="auth-links-container">
          <Link className="nav-link sign-in" to="/sign-in">
            Sign In
          </Link>
          <Link className="nav-link register" to="/register">
            Register
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
