// App.js has the root component of the react app because every view and component are handled with hierarchy in React.
// Where <App /> is the top most component in hierarchy. This gives you feel that you maintain hierarchy in your code starting from App.js.
// Import child components at the top
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/users/Users"; // Start: go to line 19 and line 20, return: go to line 81
import User from "./components/users/User";
import Search from "./components/users/Search"; //Start: line 75,
import Navbar from "./components/layouts/Navbar"; // Start: line 65
import Alert from "./components/layouts/Alert"; //Start: line 78
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";
import { tsConstructorType } from "@babel/types";

//creates Component
class App extends Component {
  //state is the data you'll be using
  state = {
    users: [], // go to line 29
    user: {},
    repos: [],
    loading: false, //loading for when data hasnt been fetched, go to line 25
    alert: null // line 78
  };
  //what you want to run when your component loads(data, api calls)
  async componentDidMount() {
    this.setState({ loading: true }); //how we change data in our state
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    this.setState({ users: res.data, loading: false }); //when data is received, do this with it. Reset state with new data, go to line 81
  }

  //search github users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    this.setState({ users: res.data.items, loading: false });
  };

  //get single GitHub user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    this.setState({ user: res.data, loading: false });
  };

  //get Users Repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    this.setState({ repos: res.data, loading: false });
  };

  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } }); // line 67

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  //render is a method("arg") to the class Component. It's what renders what your UI/data
  render() {
    //functions and variables are declared at the top.
    // don't need to use this.state
    const { users, user, repos, loading } = this.state;

    return (
      // What you are returning.
      // JSX needs to have one parent div
      //functions can be declared in brackets {loading ? {name:x} }
      // Or have Fragments
      // can pass props into components from here props is just a piece of data
      <Router>
        <div className='App'>
          <Navbar /> {/* Navbar.js */}
          <div className='container'>
            <Alert alert={this.state.alert} /> {/* Alert.js */}
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search //go to Search.js
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false} //depends on line 19
                      setAlert={this.setAlert} //Search.js
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
