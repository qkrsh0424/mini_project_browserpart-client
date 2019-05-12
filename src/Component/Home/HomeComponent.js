import React, { Component } from 'react';
import './HomeComponent.css';
import Script from 'react-load-script'

class HomeComponent extends Component {
  render(){
    return (
        <div className="home_body" id="background">
            <div class="container text-center">
            <Script
            url="./script/HomeScript.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
            />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 class="display-3 my_center_h">Easy Study</h1>
                <h4 class="my_center_h2">ESS Study Easy</h4>
                <p class="my_center_h2">F O U N D E D  I N  2 0 1 9</p>
                {/* <button class="btn btn-outline-success p-3 my-2 my-sm-0 font-weight-bold" type="button" onclick={pageevent}>Learn More</button> */}
                <a href="/main" class="btn btn-outline-success p-3 my-2 my-sm-0 font-weight-bold">Learn More</a>
            </div>
        </div>
    );
  }
  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }
   
  handleScriptError() {
    this.setState({ scriptError: true })
  }
   
  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }
}

export default HomeComponent;
