//THIS COMPONENT RETURNS THE DATA QUERRIED FROM GITHUB API, go to line 6

import React from "react";
import PropTypes from "prop-types";

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  //user object is constructed here, go to line 31

  //super is to call the parent call constructor
  //the state is the data/data types your component will be holding/using (coming from apis)
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className='btn-btn-dark.btn-sa m-1'>
          More
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem; // go back to Users.js, line 2
