import React, { Component } from "react";
import UserItem from "./UserItem"; //go to line 36
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import App from "../../App";

const Users = ({ users, loading }) => {
  //go to line 8 (loading) and line 15 (users)
  if (loading) {
    //go to line 11
    //Spinner child component to Users component
    return <Spinner />; // go to Spinner.js
  } else {
    return (
      <div style={userStyle}>
        {users.map((
          user // go to line 20
        ) => (
          // every list of props (multiple version of your component) need to have unique key
          // passing entire user object to UserItem child component
          <UserItem key={user.id} user={user} /> // go to UserItem.js
        ))}
      </div>
    );
  }
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users; //App.js, line 6
