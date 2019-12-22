import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "" //line 19 or 24
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onSubmit = e => {
    //call: line 35, back: line 19, START!!
    e.preventDefault();
    if (this.state.text === "") {
      //line 24
      //setAlert method for alerts in React
      this.props.setAlert("Please enter username", "light"); //back to App.js, line 45
    } else {
      this.props.searchUsers(this.state.text); //go back to App.js, EXIT!!
      this.setState({ text: "" }); //reset search field to empty after search
    }
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value }); // line 39 et 41, this is what fetches the input (e)

  render() {
    // don't need to put this.props everytime
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          {/* Call: line 42, back: line 16 */}
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text} //line 6
            onChange={this.onChange} // line 28
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
  }
}

export default Search;
