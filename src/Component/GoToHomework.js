import React, { Component } from 'react';
import './css/HomeworkPage.css';
import renderHTML from 'react-render-html';

class GoToHomework extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:localStorage.getItem("username"),
            class:"",
            homework:""
        }
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({class: res}))
        .catch(err => console.log(err))

        this.callApiHomework()
        .then(res => this.setState({homework: res}))
        .catch(err => console.log(err))
    }

    callApi = async() => {
        const response = await fetch('/api/class/'+this.props.match.params.classid);
        const body = await response.json();
        return body;
    }

    callApiHomework = async() => {
        const response = await fetch('/api/homework/'+this.props.match.params.homework_id);
        const body = await response.json();
        return body;
    }

    handleLogout = (e) =>{
        localStorage.clear();
        window.location.reload();
    }
  render(){
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
                                    <a class="nav-link" href={"/class/"+this.state.class.id}>{this.state.class.classname} <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href={"/lecture/"+this.state.class.id}>Lecture</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href={"/homework/"+this.state.class.id}>Homework</a>
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
    
                    <br/>
                    <div className="jumbotron jumbotron_my_gray">
                        {this.state.homework?this.state.homework.map((row)=>{
                            return(
                                <div>
                                    <h1>{row.homework_title}</h1>
                                    {renderHTML(row.homework_desc)}
                                </div>
                            );
                        }):""}
                    </div>
                </div>
            </div>
        );
      }else{
          window.location.href="/main"
      }
    
  }
}

export default GoToHomework;
