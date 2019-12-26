import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState("");

  const onSubmit = e => {
    //call: line 35, back: line 19, START!!
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter username", "light"); //back to App.js, line 45
    } else {
      searchUsers(text); //go back to App.js, EXIT!!
      setText(""); //reset search field to empty after search
    }
  };
  const onChange = e => setText(e.target.value); // line 39 et 41, this is what fetches the input (e)

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        {/* Call: line 42, back: line 16 */}
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text} //line 6
          onChange={onChange} // line 28
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-blocks'
        />
      </form>
      {showClear && (
        <button className='btn.btn-light.btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
