import React, { Component } from 'react';
import './css/LecturePage.css';
import Axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import LectureSmall from './LecturePage/LectureSmall';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  }
})

class LecturePage extends Component {
  constructor(props){
    super(props);
    this.state={
        userid:localStorage.getItem('userid'),
        username:localStorage.getItem('username'),
        class:"",
        lecturelistB:"",
        addlecturetitle:''
    }
  }
  componentDidMount(){
  this.callApi()
  .then(res => this.setState({class: res}))
  .catch(err => console.log(err));

  this.callApiLectureBig()
  .then(res => this.setState({lecturelistB: res}))
  .catch(err => console.log(err));
  }

  callApi = async() => {
  const response = await fetch('/api/class/'+this.props.match.params.classid);
  const body = await response.json();
  return body;
  }

  callApiLectureBig = async() => {
    const response = await fetch('/api/lecturebig/'+this.props.match.params.classid);
    const body = await response.json();
    return body;
    }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.AddLecture();
    window.location.reload();
  }

  handleLogout = (e) =>{
      localStorage.clear();
      window.location.reload();
    }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  AddLecture = () =>{
    const url = "/api/lecturebigadd";
    let formData = new FormData();
    formData.append("lecture_b_title", this.state.addlecturetitle);    
    
    Axios.post(url,{
        lecture_b_title:this.state.addlecturetitle,
        class_id:this.state.class.id
    })
    .then(function (response) {

      })
      .catch(function (error) {
        console.log(error);
      });
      
      this.setState({
          addlecturetitle:''
      });
    // return post(url,formData,config);
}

//delete Big Lecture
    deleteLecture(lecture_b_id){
      const url = '/api/deleteBigLecture/'+lecture_b_id;

      fetch(url,{
        method:'DELETE'
      });

      this.stateRefresh();
    }

    stateRefresh = () =>{
      this.setState({
        lecturelistB:''
      });
      // this.callApi()
      //   .then(res => this.setState({classlist: res}))
      //   .catch(err => console.log(err))

      this.callApiLectureBig()
        .then(res => this.setState({lecturelistB: res}))
        .catch(err => console.log(err));
    }

  render(){
    const { classes } = this.props;
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
  
            {/* Lecture title start*/}
            <br/>
            <div class="jumbotron jumbotron_my_green">
                <h1 class="display-4 font-weight-bold">Lecture</h1>
            </div>
            {/* Lecture title end*/}
            {/* lecture mainlist start */}
            <div class="jumbotron d-flex justify-content-center">
              <div class="accordion w-75" id="accordionExample">
                <h3>Lecture List <button class="float-right btn btn-info" data-toggle="collapse" href="#addLecture" role="button" aria-expanded="false" aria-controls="addLecture">Add Lecture</button></h3>


            {/* ADD NEW LECTURE FORM start */}
                <div class="collapse" id="addLecture">
                  <div class="card card-body">
                      <form class="was-validated" onSubmit={this.handleFormSubmit}>
                      <div class="form-group">
                        <label for="lecture_b_title">TITLE</label>
                        <input type="input" class="form-control" id="lecture_b_title" placeholder="Title" name="addlecturetitle" value={this.state.addlecturetitle} onChange={this.handleValueChange} required/>
                      </div>
                        <button class="btn btn-outline-success p-2" type="submit">ADD</button>
                      </form>
                  </div>
                </div>
            {/* ADD NEW LECTURE FORM end */}

                <div class="card">
                  {/* lectureBig start */}
  
                  {this.state.lecturelistB ? this.state.lecturelistB.map((row)=>{
                    return(
                      <div>
                        <div class="card-header" id="headingOne">
                          <h2 class="mb-0">
                            <h3 class="text-center">{row.lecture_b_title}</h3>
                            <hr/>
                            <div class="text-right">
                                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="collapse" data-target={"#collapse"+row.lecture_b_id} aria-expanded="true" aria-controls={"collapse"+row.lecture_b_id}>
                                    view all of the contents
                                </button>
  
                                <a class="btn btn-primary" data-toggle="collapse" href={"#collapseController"+row.lecture_b_id} role="button" aria-expanded="false" aria-controls={"collapseController"+row.lecture_b_id}>
                                    Controller
                                </a>
                            </div>
                          </h2>
                        </div>
                        <div class="collapse" id={"collapseController"+row.lecture_b_id}>
                          <div class="card card-body">
                              <a class="btn btn-outline-success p-2" href={"/makelecture/"+row.class_id+"/"+row.lecture_b_id}>ADD</a>
                              <button class="btn btn-outline-danger p-2" type="button" onClick={(e)=>{this.deleteLecture(row.lecture_b_id)}}>DELETE</button>
                              <button class="btn btn-outline-primary p-2" type="button" onclick='window.location="/main"'>UPDATE</button>
                          </div>
                        </div>
  
                        {this.state.class.id ? <LectureSmall
                          classid = {this.state.class.id}
                          lecture_b_id = {row.lecture_b_id}
                        />:<CircularProgress className={classes.progress} />}
                      </div>
                    );
                  }):<CircularProgress className={classes.progress} />}
                  {/* lectureBig end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      window.location.href="/main";
    } 
  }
}

export default withStyles(styles)(LecturePage);
