import React, { Component } from 'react';
import Auth from './auth/Auth';
import SiteBar from './home/Navbar';
import Splash from './home/Splash';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: '',
    }
    this.setSessionState = this.setSessionState.bind(this);
    this.protectedViews = this.protectedViews.bind(this);
    this.logout = this.logout.bind(this);
  }
  setSessionState(token) {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }
  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }
  logout() {
    this.setState({ 
      sessionToken: ''
    });
    localStorage.clear();
  }
  protectedViews() {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
            <Splash sessionToken={this.state.sessionToken} />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Route path="/auth" >
          <Auth setToken={this.setSessionState}/>
        </Route>
      )
    }
  }
  render() {
    return (
      <Router>
        <div>
          <SiteBar clickLogout={this.logout} />
          {this.protectedViews()}
        </div>
      </Router>
    );
  }
}
export default App;


// Add Comment