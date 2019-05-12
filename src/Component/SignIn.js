import React, { Component } from 'react';
import Axios from 'axios';
import './css/SignIn.css';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state={
            id:0,
            email: '',
            password: ''
        }
        console.log(localStorage.getItem('userid'));
        console.log(localStorage.getItem('username'));
        // localStorage.clear();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AuthenticateUser();
        // .then((response)=>{
        //     console.log(response.data);
        // })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    AuthenticateUser = () =>{
        const url = "/api/authsignin";
        let formData = new FormData();
        formData.append("email", this.state.email);
        // console.log(formData);
        formData.append("password", this.state.password);
        // console.log(formData);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart-form-data'
        //     }
        // }
        // console.log(url);
        // console.log(config);
        // for (var key of formData.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
        // }
        Axios.post(url,{
            email:this.state.email,
            password:this.state.password
        })
        .then(function (response) {
            if(response.data===""){
                document.getElementById('useremailfocus').focus();
            }else{
                localStorage.setItem('userid',response.data.id);
                localStorage.setItem('username',response.data.name);
                window.location.href='/main';
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
                    <div class="row">
                        <div class="col">
                        </div>
                        <div class="col-7 my_background_gray my_padding_left_right">
                            <h1 class="text-center mb-5 display-3 p-3 font-weight-bold">
                                <a href="/main" class="text-success text-decoration-none">Easy Study</a>
                            </h1>
    
                            <div class="container">
                                <form class="was-validated" onSubmit={this.handleFormSubmit}>
                                    <input id="useremailfocus" type="email" name="email" class="form-control mb-3 p-4" value={this.state.email} onChange={this.handleValueChange} placeholder="User Email" required/>
                                    <input type="password" name="password" class="form-control mb-3 p-4" id="exampleInputPassword1" value={this.state.password} onChange={this.handleValueChange} placeholder="Password" required/>
                                    <button type="submit" class="btn btn-success btn-lg btn-block p-4 my_text_fontsize_30">Confirm</button>
                                </form>
    
                                <div class="mt-5">
                                    <a href="/signup">New Account</a>
                                </div>
                            </div>
                            </div>
                        <div class="col">
                        </div>
                    </div>
                </div>
            </div>
        );
      }
    
  }
}

export default SignIn;
