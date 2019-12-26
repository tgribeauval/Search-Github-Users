// App.js has the root component of the react app because every view and component are handled with hierarchy in React.
// Where <App /> is the top most component in hierarchy. This gives you feel that you maintain hierarchy in your code starting from App.js.
// Import child components at the top
import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/users/Users"; // Start: go to line 19 and line 20, return: go to line 81
import User from "./components/users/User";
import Search from "./components/users/Search"; //Start: line 75,
import Navbar from "./components/layouts/Navbar"; // Start: line 65
import Alert from "./components/layouts/Alert"; //Start: line 78
import About from "./components/pages/About";
import axios from "axios";
import GithubState from "./context/github/GithubState";
import "./App.css";
import { tsConstructorType } from "@babel/types";

//creates Component
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //search github users
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  //get single GitHub user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    );
    setUser(res.data);
    setLoading(false);
  };

  //get Users Repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}` // API KEYS from .env.local file.
    ); // go fetch our data at this api
    setRepos(res.data);
    setLoading(false);
  };

  //Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(true);
  };

  //set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} /> {/* Alert.js */}
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search //go to Search.js
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false} //depends on line 19
                      setAlert={showAlert} //Search.js
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
                    getUser={getUser}
                    getUserRepos={getUserRepos}
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
    </GithubState>
  );
};

export default App;
