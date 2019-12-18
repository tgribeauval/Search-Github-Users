// App.js has the root component of the react app because every view and component are handled with hierarchy in React.
// Where <App /> is the top most component in hierarchy. This gives you feel that you maintain hierarchy in your code starting from App.js.
// Import child components at the top
import React, { Component } from "react";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Navbar from "./components/layouts/Navbar";
import axios from "axios";
import "./App.css";
import { tsConstructorType } from "@babel/types";

//creates Component
class App extends Component {
  //state is the data you'll be using
  state = {
    users: [],
    loading: false //loading for when data hasnt been fetched
  };
  //what you want to run when your component loads(data, api calls)
  async componentDidMount() {
    this.setState({ loading: true }); //how we change data in our state
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    this.setState({ users: res.data, loading: false }); //when data is received, do this with it. Reset state with new data
  }

  //search github users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    this.setState({ users: res.data.items, loading: false });
  };
  //render is a method("arg") to the class Component. It's what renders what your UI/data
  render() {
    //functions and variables are declared at the top.

    return (
      // What you are returning.
      // JSX needs to have one parent div
      //functions can be declared in brackets {loading ? {name:x} }
      // Or have Fragments
      // can pass props into components from here props is just a piece of data
      //

      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
