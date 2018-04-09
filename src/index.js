import React from 'react';
import { Navbar,NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
// import { Router, Route, Switch } from 'react-router'

import { BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
