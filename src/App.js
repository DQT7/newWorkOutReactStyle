import React, {Component} from 'react';
import "./App.css";
import SiteBar from './home/Navbar';
import ManageUser from './auth/ManageUser';
import Splash from './home/Splash';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import { Container, Row, Col } from 'reactstrap';
import Auth from './auth/Auth';
// import { Router, Route, Switch } from 'react-router'
import {
    Navbar,
    NavbarBrand,
    } from 'reactstrap';


class App extends Component {
    constructor() {
        super();
        this.state = {
        sessionToken: '',
        profileImage: ''
        }
        this.setSessionState = this.setSessionState.bind(this);
        this.logout = this.logout.bind(this);
        this.modifyProfileImage = this.modifyProfileImage.bind(this);
        this.protectedViews = this.protectedViews.bind(this);
    }
    setSessionState(token) {
        localStorage.setItem('token', token);
        this.setState({ sessionToken: token });
    }
    componentWillMount() {
        const token = localStorage.getItem('token')

        if (token && !this.state.sessionToken) {
          this.setState({ sessionToken: token });
          if (localStorage.getItem('profileImage')) {
            this.setState({profileImage: localStorage.getItem('profileImage') })
          }
        }
      }


    
    newMethod(token) {
        this.setState({ sessionToken: token });
    }
    logout() {
        this.setState({ 
          sessionToken: '', 
          profileImage: ''
        });
        localStorage.clear();
      }
      modifyProfileImage(imgUrl){
        this.setState({
            profileImage: imgUrl
        });
        localStorage.setItem('profileImage', imgUrl);
        }
        protectedViews() {
            if (this.state.sessionToken === localStorage.getItem('token')) {
              return (
                <Switch>
                     <div>
                  <Route path='/manage-user'>
                    <ManageUser sessionToken={this.state.sessionToken} addImage={this.modifyProfileImage} profileImg={this.state.profileImage}/>
                  </Route>
                  <Route path='/' exact>
                    <Splash sessionToken={this.state.sessionToken} profileImg={this.state.profileImage} />
                </Route>
                  </div>
                </Switch>
                 
              )
            } else {
              return (
                 
                <Route path="/auth" >
                  <Auth setToken={this.setSessionState} addImage={this.modifyProfileImage}/>
                  </Route>

                
               
              )
            }
          }

    render() {
        return (
            <Router>
                <div>
                    <SiteBar clickLogout={this.logout}/>
                    
                    
                    <Route path='/' exact>
                        {this.protectedViews()}
                    </Route>
                </div>
            </Router>
        );
    }
} 


export default App;