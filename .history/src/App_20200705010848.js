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


const App = () => {

  const [users, setUsers] = useState ([])
  const [user, setUser] = useState ({})
  const [repos, setRepos] = useState ([])
  const [loading, setLoading] = useState (false)
  const [clear, setClear] = useState (false)
  const [alert, setAlert] = useState (null)

  async componentDidMount () {
    this.setState({
      users : res.data,
      loading : false
    })
  }

  useEffect (() => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data)
    setLoading(false)
    // eslint-disable-next-line
  }, []);

  const searchUsers = async (text) => {

    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
    setUsers(res.data.items)
    setLoading(false)
    setClear(true)
    console.log(text)
  }

  const getUser = async (username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(res.data)
    setLoading(false)
  }

  const getUserRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = async () => {

    setLoading(true)
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUsers(res.data)
    setLoading(false)
    setClear(false)
  }

  const setAlert = (msg, type) =>{
    setAlert({ msg, type })

    setTimeout (() => setAlert(null), 5000)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <div className="container">
          <Alert alert = {alert}/>
          <Switch>
            <Route exact path = '/' render = {props =>(
              <Fragment>
                <Search
                  searchUsers = {searchUsers} 
                  clearUsers = {clearUsers} 
                  showClear = {clear}
                  setAlert = {setAlert}/>
                <Users loading = {loading} users = {users} />
              </Fragment>
            )} />
            <Route exact path = '/about' component = {About}/>
            <Route exact path = '/user/:login' render = {props => (
              <User 
                { ...props } 
                getUser = {getUser}
                getUserRepos = {getUserRepos} 
                user = {user}
                repos = {repos}
                loading = {loading}/>
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
