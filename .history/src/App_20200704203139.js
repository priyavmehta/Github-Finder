import React,{ Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';


class App extends Component {

  state = {
    users : [],
    loading : false,
    clear : false
  }

  async componentDidMount () {

    this.setState({
      loading : true
    })
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users : res.data,
      loading : false
    })
  }

  searchUsers = async (text) => {

    this.setState({
      loading : true
    })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users : res.data.items,
      loading : false,
      clear : true
    })
    console.log(text)
  }

  clearUsers = async () => {

    this.setState({
      loading : true
    })
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users : res.data,
      loading : false,
      clear : false
    })

  }

  render() {
    const { users, loading, clear } = this.state;

    return (
      <div className="App">
        <Navbar />
        
        <div className="container">
          <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} showClear = {clear}/>
          <Users loading = {loading} users = {users} />
        </div>
      </div>
    );
  }
}

export default App;
