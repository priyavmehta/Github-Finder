import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';


const App = () => {

  const [users, setUsers] = useState ([])
  const [loading, setLoading] = useState (false)

  useEffect (async () => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data)
    setLoading(false)
    // eslint-disable-next-line
  }, []);

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            
            <div className="container">
              <Alert alert = {alert}/>
              <Switch>
                <Route exact path = '/' render = {props =>(
                  <Fragment>
                    <Search />
                    <Users />
                  </Fragment>
                )} />
                <Route exact path = '/about' component = {About}/>
                <Route exact path = '/user/:login' component = {User}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
