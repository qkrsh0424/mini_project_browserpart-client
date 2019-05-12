import React, { Component } from 'react';
import './css/Profile.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ProfileChild from './Profile/ProfileChild';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: "5%"
  },
});

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userid : localStorage.getItem('userid'),
            userdata:""
        }
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({userdata: res}))
        .catch(err => console.log(err))
        }

        callApi = async() => {
        const response = await fetch('/api/profile/'+this.state.userid);
        const body = await response.json();
        return body;
        }
        
    render(){
        var navlist=[];
        var logbuttonHeader=[];
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
                    <h4 class="dropdown-item-text">{localStorage.getItem('username')}</h4>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/profile">Profile</a>
                    <input type="button" class="dropdown-item" onClick={this.handleLogout} value="Logout"/>
                </div>
            </div>
            </div>
          );
        const { classes } = this.props;
        console.log(this.state.userdata);
        return (
            <div class="background">
            <div class="container">
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
            <div class="myflex">
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                <div class="myfontsubject">--User Profile--</div>
                </Typography>
                <Typography component="p">
                <ProfileChild
                    userid={this.state.userdata.id}
                    username={this.state.userdata.name}
                    useremail={this.state.userdata.email}
                    usergender={this.state.userdata.gender}
                    usercreated={this.state.userdata.created}
                />
                </Typography>
            </Paper>
            </div>
            </div>
            </div>
        );
    }
  
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
