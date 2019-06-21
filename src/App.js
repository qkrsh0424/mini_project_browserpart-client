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
import SimpleReactFileUpload from './Component/SimpleReactFileUpload';
import MakeLecturePage from './Component/MakeLecturePage';
import StudentListPage from './Component/StudentListPage';
import HomeworkPage from './Component/HomeworkPage';
import CreateHomework from './Component/CreateHomework';
import GoToHomework from './Component/GoToHomework';


import RichTextEx from './Component/RichTextEx';
import DebatePage from './Component/DebatePage';

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
              <Route path='/lecturecontents/:classid/:lecture_b_id/:lecture_s_id' component={LectureContentsPage} />
              <Route path='/makelecture/:classid/:lecture_b_id' component={MakeLecturePage} />
              <Route path='/studentList/:classid' component={StudentListPage} />
              <Route path='/homework/:classid' component={HomeworkPage} />
              <Route path='/createHomework/:classid' component={CreateHomework} />
              <Route path='/gotoHomework/:classid/:homework_id' component={GoToHomework} />


              {/* example of richtext */}
              <Route path='/richtext' component={RichTextEx} />
              <Route path='/Debate/:classid' component={DebatePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
