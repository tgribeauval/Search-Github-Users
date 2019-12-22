//RCE + TAB GENERERATES SKELETON

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  //line 26
  // props are arguments you throw to the Navbar component.

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title} {/* line 37 */}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

//means this data will be rendered if no data coming in
Navbar.defaultProps = {
  title: "Github Finder", //line 13
  icon: "fab fa-github" //line 13
};
//propType is for data validating (string, array, function), good!
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar; // back to App.js, line
