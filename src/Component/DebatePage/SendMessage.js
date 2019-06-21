import React, { Component } from 'react';

class SendMessage extends Component {
  render(){
    return (
        <div>
            <form>
                <div class="form-group">
                    <label for="inputText">user name : </label>
                    <input type="text" class="form-control" id="inputText" placeholder="Enter message..."/>
                </div>
                <button type="submit" class="btn btn-primary">Send</button>
            </form>
        </div>
    );
  }
}

export default SendMessage;
