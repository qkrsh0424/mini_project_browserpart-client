import React, { Component } from 'react';
import Axios from 'axios';
import './css/SignUp.css';
class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            username:'',
            gender:'',
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AuthenticateUser();
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    AuthenticateUser = () =>{
        const url = "/api/signup";
        let formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("username", this.state.username);
        formData.append("gender", this.state.gender);
        
        Axios.post(url,{
            email:this.state.email,
            password:this.state.password,
            username:this.state.username,
            gender:this.state.gender
        })
        .then(function (response) {
            if(response.data.insertId){
                window.location.href='/main';
            }
            else{
                document.getElementById('useremailfocus').focus();
                document.getElementById('logalert').style.display = 'block';
            }
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({
              email:'',
              password:''
          });
        // return post(url,formData,config);
    }

  render(){
    if(localStorage.getItem('userid')){
        window.location.href="/main";
      }else{
        return (
            <div className="container">
                <div class="jumbotron mt-5 my_rounded-pill border border-success bg-light">
                    <div class="alert alert-danger alert-dismissible fade show mydisplay" role="alert" id="logalert">
                    Check again your username and password and Email!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="was-validated" onSubmit={this.handleFormSubmit}>
                        <div class="form-group">
                            <label for="useremailfocus">UserEmail</label>
                            <input id="useremailfocus" type="email" name="email" class="form-control" value={this.state.email} onChange={this.handleValueChange} placeholder="User Email" required/>
                        </div>
                        <div class="form-group">
                            <label for="InputPassword">Password</label>
                            <input type="password" class="form-control" id="InputPassword" placeholder="Password" name="password" value={this.state.password} onChange={this.handleValueChange} required/>
                        </div>
                        <div class="form-group">
                            <label for="InputUsername">Username</label>
                            <input id="usernamefocus" type="input" class="form-control" id="InputUsername" placeholder="Username" name="username" value={this.state.username} onChange={this.handleValueChange} required/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Gender</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="gender" value={this.state.gender} onChange={this.handleValueChange} required>
                                <option value="">--------</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-outline-success p-3 my-2 my-sm-0" type="submit">Submit</button>
                            <a class="btn btn-outline-danger p-3 my-2 my-sm-0" href='/main'>Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        );
      }
  }
}

export default Signup;
