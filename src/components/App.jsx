import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Receiver from '../pages/Receiver';
import Sender from '../pages/Sender';
import Header from './Header';
import Menu from './Menu';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        <Header />
        <Menu />
        <Route path='/sender' component={Sender} />
        <Route path='/receiver' component={Receiver} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
