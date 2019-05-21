import React, { Component } from 'react';
import Axios from 'axios';

class CreateClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            classname:'',
            classdesc:'',
            classtype:''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.CreateClassApi();
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    CreateClassApi = () =>{
        const url = "/api/createclass";
        let formData = new FormData();
        formData.append("classname", this.state.classname);
        formData.append("classdesc", this.state.classdesc);
        formData.append("classtype", this.state.classtype);
        formData.append("author_id", localStorage.getItem('userid'));
        formData.append("author_name", localStorage.getItem('username'));
        
        Axios.post(url,{
            classname:this.state.classname,
            classdesc:this.state.classdesc,
            classtype:this.state.classtype,
            author_id:localStorage.getItem('userid'),
            author_name:localStorage.getItem('username')
        })
        .then(function (response) {
            if(response.data.insertId){
                window.location.href='/main';
            }
            else{
                document.getElementById('titlefocus').focus();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({
              classname:'',
              classdesc:'',
              classtype:''
          });
    }

  render(){
    if(localStorage.getItem('userid')){
        return (
            <div class="jumbotron mt-5">
            <form class="was-validated" onSubmit={this.handleFormSubmit}>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Course Title</label>
                    <input type="input" class="form-control" id="titlefocus" placeholder="Title" name="classname" value={this.state.classname} onChange={this.handleValueChange} required/>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Type Of Course</label>
                    <select class="form-control" name="classtype" value={this.state.classtype} onChange={this.handleValueChange} required>
                        <option value="">--------------</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Business">Business</option>
                        <option value="Management">Management</option>
                        <option value="Math">Math</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Course Description</label>
                    <textarea class="form-control" rows="3" placeholder="Description here..." name="classdesc" value={this.state.classdesc} onChange={this.handleValueChange} required></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-outline-success p-3 my-2 my-sm-0" type="submit">Submit</button>
                    <button class="btn btn-outline-danger p-3 my-2 my-sm-0" type="button" onclick='window.location="/main"'>Cancel</button>
                </div>
            </form>
        </div>
        );
      }else{
        window.location.href="/main";
      }
  }
}

export default CreateClass;
