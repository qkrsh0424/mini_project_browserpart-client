import React, { Component } from 'react';
import MainPageHeader from './MainPage/MainPageHeader';

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            userid:0,
            username:"",
        }
        console.log(localStorage.getItem('userid'));
        console.log(localStorage.getItem('username'));
        if(localStorage.getItem('userid')){
            this.state={
                userid:localStorage.getItem('userid'),
                username:localStorage.getItem('username')
            }   
        }
        // localStorage.clear();   
    }
  render(){
    return (
        <div>
            <MainPageHeader 
            data={this.state.userid}
            username={this.state.username}
            />
        </div>
    );
  }
}

export default MainPage;
