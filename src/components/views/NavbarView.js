import React, { Component } from "react";
import { Link } from "react-router-dom";

const NavbarView = (props) => {
  let navbarLinks;
  if (props.isLoggedIn) {
    navbarLinks = (
      <li className="nav-item">
        <Link to="/profile" className="nav-link">Profile</Link>
      </li>
    );
  } else {
    navbarLinks = (
      <>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">Signup</Link>
        </li>
      </>
    );
  }
  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            {navbarLinks}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarView;