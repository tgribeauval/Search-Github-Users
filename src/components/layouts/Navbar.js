//RCE + TAB GENERERATES SKELETON

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  // props are arguments you throw to the Navbar component.

  return (
    <nav className='nabar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link className='test' to='/'>
            Home
          </Link>
          <Link className='test' to='/about'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

//means this data will be rendered if no data coming in
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};
//propType is for data validating (string, array, function), good!
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

// to export your component to the main component
export default Navbar;
