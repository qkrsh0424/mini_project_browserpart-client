import React, { Component } from 'react';
import './MainPageHeader.css';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  }
})
class MainPageHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      classlist:""
    }
  }

  componentDidMount(){
    this.callApi()
    .then(res => this.setState({classlist: res}))
    .catch(err => console.log(err))
  }

  callApi = async() => {
    const response = await fetch('/api/classlist/'+localStorage.getItem('userid'));
    const body = await response.json();
    return body;
  }

  handleLogout = (e) =>{
    localStorage.clear();
    window.location.reload();
  }
  render(){
    const { classes } = this.props;
    var navlist=[];
    var logbuttonHeader=[];
    var logbuttonMain=[];
    console.log(this.state.classlist);
    if(this.props.data){
      navlist.push(
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href="/main">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/class">Class</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/news">News</a>
            </li>
        </ul>
      );
      logbuttonHeader.push(
        <div>
        <div class="dropdown">
            <button class="btn btn-outline-success my-2 my-sm-0 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button">
              <i class="fas fa-user-check"></i>
            </button>
            <div class="dropdown-menu">
                <h4 class="dropdown-item-text">{this.props.username}</h4>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/profile">Profile</a>
                <input type="button" class="dropdown-item" onClick={this.handleLogout} value="Logout"/>
            </div>
        </div>
        </div>
      );
      logbuttonMain.push(
        <div>
          <div class="card-columns text-center">
          {/* loop start */}
          {this.state.classlist ? this.state.classlist.map((row)=>{
            return(
              <div class="card border-success mycard">
                  <div class="card-body">
                      <h5 class="card-title">{row.classname}</h5>
                      <p class="card-text overflow-auto mycard-text">{row.classdesc}</p>
                      <a href={"/class/"+row.id} class="btn btn-primary">Go To Classroom</a>
                  </div>
              </div>
            );
          }) : <CircularProgress className={classes.progress} />}
          {/* loop end */}
          <div class="card border-success mycard">
              <div class="card-body">
                  <a href="/main/{{sessionuserid}}/createclass" class="mycard-body-a"><i class="fas fa-plus"></i></a>
              </div>
          </div>
          </div>
        </div>
      );
    }else{
      navlist.push(
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href="/main">Home <span class="sr-only">(current)</span></a>
            </li>
        </ul>
      );
      logbuttonHeader.push(
        <div>
      <a href="/main" class="btn btn-outline-success mr-2 my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign Up</a>
      <a href="/signin" class="btn btn-outline-success my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign In</a>
      </div>
      );
      logbuttonMain.push(
        <div>
          <h1 class="display-4">Easy Study is Easy</h1>
          <p>If you want learn more, first you should sign up or sign in</p>
          <p>
          <a href="/main" class="btn btn-outline-success btn-lg mr-2 my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign Up</a>
          <a href="/signin" class="btn btn-outline-success btn-lg my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign In</a>
          </p>
        </div>
      );
    }

    return (
      <div className="background">
      <div className="container">
{/* Header */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand font-weight-bold" href="/main">Easy Study</a>
                    {navlist}
                    {logbuttonHeader}
                    {/* <a href="/main" class="btn btn-outline-success mr-2 my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign Up</a>
                    <a href="/main" class="btn btn-outline-success my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign In</a> */}
                </div>
            </nav>
{/* Header End */}

            <br/>
        
{/* Main */}
            <div class="jumbotron jumbotron_my_green">
                <h1 class="text-center display-2 font-weight-bold">Easy Study</h1>
                <p class="text-center">Easy Course, if you want open the class, you can use this page.</p>
            </div>
            <div class="jumbotron jumbotron_my_gray">
                <div class="text-center">
                      {logbuttonMain}
                        {/* <a href="/main" class="btn btn-outline-success btn-lg mr-2 my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign Up</a>
                        <a href="/main" class="btn btn-outline-success btn-lg my-2 my-sm-0" aria-haspopup="true" aria-expanded="false">Sign In</a> */}
                </div>
            </div>
{/* Main End */}
        </div>
        </div>
    );
  }
}

export default withStyles(styles)(MainPageHeader);
