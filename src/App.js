import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page import
import Home from './Component/Home';
import MainPage from './Component/MainPage';
import SignIn from './Component/SignIn';
import ClassPage from './Component/ClassPage';
import Profile from './Component/Profile';
import SignUp from './Component/SignUp';
import CreateClass from './Component/CreateClass';
import ClassSide from './Component/ClassSide';
import LecturePage from './Component/LecturePage';
import LectureContentsPage from './Component/LectureContentsPage';

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          {/* <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr /> */}
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/main' component={MainPage} />
              <Route path='/signin' component={SignIn} />
              <Route path='/class/:classid' component={ClassPage} />
              <Route path='/profile' component={Profile} />
              <Route path='/signup' component={SignUp} />
              <Route path='/createclass' component={CreateClass} />
              <Route path='/class/' component={ClassSide} />
              <Route path='/lecture/:classid' component={LecturePage} />
              <Route path='/lecture/:classid/:lectureid' component={LectureContentsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
