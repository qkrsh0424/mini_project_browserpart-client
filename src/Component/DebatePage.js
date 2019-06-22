import React, { Component } from 'react';
import DebatePageMessage from './DebatePage/DebatePageMessage';
import SendMessage from './DebatePage/SendMessage';
import DebatePageNav from './DebatePage/DebatePageNav';
import './DebatePage/DebatePage.css';

class DebatePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:localStorage.getItem('username'),
            class:''
        }
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({class: res}))
        .catch(err => console.log(err))
      }
    
      callApi = async() => {
        const response = await fetch('/api/class/'+this.props.match.params.classid);
        const body = await response.json();
        return body;
      }
  render(){
    return (
        <div className="container">
            <DebatePageNav
                classid = {this.props.match.params.classid}
            />
            <DebatePageMessage 
                classid = {this.props.match.params.classid}
            />
            {/* <SendMessage/> */}
        </div>
    );
  }
}

export default DebatePage;
