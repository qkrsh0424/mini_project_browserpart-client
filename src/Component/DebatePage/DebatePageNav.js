import React, { Component } from 'react';

class DebatePageNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:localStorage.getItem('username'),
            class:"",
        }
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({class: res}))
        .catch(err => console.log(err))
      }
    
      callApi = async() => {
        const response = await fetch('/api/class/'+this.props.classid);
        const body = await response.json();
        return body;
      }

    handleLogout = (e) =>{
        localStorage.clear();
        window.location.reload();
      }
  render(){
    return (
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
                <li class="nav-item">
                    <a class="nav-link" href={"/lecture/"+this.state.class.id}>Lecture</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href={"/homework/"+this.state.class.id}>Homework</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href={"/debate/"+this.state.class.id}>Debate</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href={"/studentList/"+this.state.class.id}>Students</a>
                </li>
                    {/* <li class="nav-item">
                    <a class="nav-link" href="/news">News</a>
                    </li> */}
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
    );
  }
}

export default DebatePageNav;
