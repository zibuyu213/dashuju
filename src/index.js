import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import './index.css';
import Head from './page/Head';
import City from './page/City';
import District from './page/District';
import Park from './page/Park';
import * as serviceWorker from './serviceWorker';
import { Row, Col, Button } from 'antd';
import logo from './img/logo.png';
import left from './img/left.png';
import left1 from './img/left1.png';
import left2 from './img/left2.png';
import right from './img/right.png';
import right1 from './img/right1.png';
import right2 from './img/right2.png';

export default class Hello extends Component {
  render() {
    return (
      <Router>
        <div style={{ width:'100%',height:'100%'}} >
          <Head/>
          <div style={{padding:10,paddingLeft:37,paddingRight:37}} >
          <img src = {left}style={{zIndex: 2,position: 'absolute',left:15,top:175}} />
          <img src = {left1}style={{zIndex: 2,position: 'absolute',left:15,top:900}} />
          <img src = {left2}style={{zIndex: 2,position: 'absolute',left:15,top:700}} />
          <img src = {right}style={{zIndex: 2,position: 'absolute',right:15,top:107}} />
          <img src = {right1}style={{zIndex: 2,position: 'absolute',right:15,top:800}} />
          <img src = {right2}style={{zIndex: 2,position: 'absolute',right:15,top:455}} />
          <Route exact path="/" component={City}/>
          <Route path="/City" component={City}/>
          <Route path="/District" component={District} />
          <Route path="/Park" component={Park} />
          </div>
        </div>
      </Router>
    )
  }
}



ReactDOM.render(<Hello />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
