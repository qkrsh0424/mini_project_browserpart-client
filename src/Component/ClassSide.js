import React, { Component } from 'react';
import Axios from 'axios';
import './css/ClassSide.css';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    }
  })

class ClassSide extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:localStorage.getItem('username'),
            classlist:''
        }
    }

    stateRefresh = () => {
        this.setState({
            classlist:''
        });
        this.callApi()
        .then(res => this.setState({classlist: res}))
        .catch(err => console.log(err))
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

    deleteClass(classid){
        const url = '/api/deleteclass/'+classid;
        fetch(url,{
            method: 'DELETE'
        });
        this.stateRefresh();
    }

  render(){
    const { classes } = this.props;
    if(localStorage.getItem('userid')){
        return (
            <div className="background">
                <div className="container">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a class="navbar-brand font-weight-bold" href="/main">Easy Study</a>
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" href="/main">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item active">
                                <a class="nav-link" href="/class">Class</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="/news">News</a>
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-outline-success my-2 my-sm-0 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button">
                            <i class="fas fa-user-check"></i>
                            </button>
                            <div class="dropdown-menu">
                                <h4 class="dropdown-item-text">{this.state.username}</h4>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/profile">Profile</a>
                                <input type="button" class="dropdown-item" onClick={this.handleLogout} value="Logout"/>
                            </div>
                        </div>
                    </nav>
                    <div class="jumbotron mt-5">
                        <div class="list-group">
                            {this.state.classlist ? this.state.classlist.map((row)=>{
                                return(
                                    <div>
                                        <div class="list-group-item">
                                        <a class="list-group-item-action" href={"/class/"+row.id}>
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{row.classname}</h5>
                                                <small class="text-muted">created at : {row.class_created}</small>
                                            </div>
                                            <p class="mb-1">{row.classdesc}</p>
                                                <small class="text-muted">Created by {this.state.username}</small>
                                        </a>
                                            <div class="text-right">
                                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target={"#collapseExample"+row.id} aria-expanded="false" aria-controls="collapseExample">
                                                    Delete this class
                                                </button>
                                            </div>
                            
                                        </div>
                            
                                        <div class="collapse" id={"collapseExample"+row.id}>
                                            <div class="card card-body">
                                                <h3>Do you want to delete, right?</h3>
                                                <div class="text-right">
                                                    <button class="btn btn-outline-danger p-2 my-2 my-sm-0" type="submit" onClick={(e)=>{this.deleteClass(row.id)}}>DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : <CircularProgress className={classes.progress} />}
                            {/* loop end */}
                        </div>
                    </div>
                </div>
            </div>
        );
      }else{
          window.location.href="/main";
      }
  }
}

export default withStyles(styles)(ClassSide);
