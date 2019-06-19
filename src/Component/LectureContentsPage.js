import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './css/LectureContentsPage.css';

import ContentsSource from './LectureContentsPage/ContentsSource';

class LectureContentsPage extends Component {
  constructor(props){
    super(props);
    this.state={
      userid : localStorage.getItem('userid'),
      username : localStorage.getItem('username'),
      class:"",
      lectureB:"",
      lectureS:""
    }
  }

  componentDidMount(){
    this.callApi()
    .then(res => this.setState({class: res}))
    .catch(err => console.log(err));
  
    this.callApiLectureBig()
    .then(res => this.setState({lectureB: res}))
    .catch(err => console.log(err));

    this.callApiLectureSmall()
    .then(res => this.setState({lectureS: res}))
    .catch(err => console.log(err));
    }
  
    callApi = async() => {
    const response = await fetch('/api/class/'+this.props.match.params.classid);
    const body = await response.json();
    return body;
    }

    callApiLectureBig = async() => {
      const response = await fetch('/api/lecturebig/'+this.props.match.params.classid+"/"+this.props.match.params.lecture_b_id);
      const body = await response.json();
      return body;
      }
  
    callApiLectureSmall = async() => {
      const response = await fetch('/api/lecturesmall/'+this.props.match.params.lecture_b_id+"/"+this.props.match.params.lecture_s_id);
      const body = await response.json();
      return body;
      }

    handleLogout = (e) =>{
      localStorage.clear();
      window.location.reload();
    }


  render(){
    if(this.state.userid){
    return (
        <div class="background">
          <div class="container">
            {/* lecture nav */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand font-weight-bold" href="/main">Easy Study</a>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href={"/class/"+this.state.class.id}>{this.state.class.classname} <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href={"/lecture/"+this.state.class.id}>Lecture</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={"/homework/"+this.state.class.id}>Homework</a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link" href="#">Debate</a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href={"/studentList/"+this.state.class.id}>Students</a>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <button class="btn btn-outline-success my-2 my-sm-0 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button"><i class="fas fa-user-check"></i></button>
                        <div class="dropdown-menu">
                            <h4 class="dropdown-item-text">{this.state.username}</h4>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/profile">Profile</a>
                            <input type="button" class="dropdown-item" onClick={this.handleLogout} value="Logout"/>
                        </div>
                    </div>
                </div>
            </nav>
            {/* nav end */}

            {/* Lecture title start*/}
            <br/>
            <div class="jumbotron jumbotron_my_green">
                <h1 class="display-4 font-weight-bold">{this.state.lectureS.lecture_s_title}</h1>
            </div>
            {/* Lecture title end*/}

            {/* Lecture desc start*/}
            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="text-center text-info">Introduce</h1>
                <h3 class="lead">{this.state.lectureS.lecture_s_desc}</h3>
                {/* <ReactPlayer url="https://www.youtube.com/watch?v=AhKZV2J4IGg" controls/> */}
                
                <br/>
                    
                {this.state.lectureS?<ContentsSource
                  lectureS={this.state.lectureS}
                />:""}

              </div>
            </div>
            {/* Lecture desc end*/}

          </div>  
          {/* wrapper end */}
        </div>
        /* final wrapper end */
    );
    }else{
      window.location.href="/main";
    }
  }
}

export default LectureContentsPage;
