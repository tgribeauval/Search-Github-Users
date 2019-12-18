import React, { Component } from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";

const Users = ({ users, loading }) => {
  if (loading) {
    //Spinner child component to Users component
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          // every list of props (multiple version of your component) need to have unique key
          // passing entire user object to UserItem child component
          <UserItem key={user.id} user={user} />
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

export default Users;
