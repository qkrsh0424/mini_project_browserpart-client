import React, { Component } from 'react';
import Axios from 'axios';

class MakeLecturePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            classid:this.props.match.params.classid,
            lecture_b_id:this.props.match.params.lecture_b_id,
            lecturetitle:"",
            lecturedesc:""
        }
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AddSmallLecture();
        window.location.href="/lecture/"+this.state.classid;
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    AddSmallLecture = () =>{
        const url = "/api/addLectureSamll/"+this.state.classid+"/"+this.state.lecture_b_id;
        let formData = new FormData();
        formData.append("lecturetitle", this.state.lecturetitle);
        formData.append("lecturedesc", this.state.lecturedesc);
        
        Axios.post(url,{
            lecturetitle:this.state.lecturetitle,
            lecturedesc:this.state.lecturedesc
        })
        .then(function (response) {
    
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.setState({
            lecturetitle:'',
            lecturedesc:''
          });
        // return post(url,formData,config);
    }
  render(){
    return (
      <div class="container">
          <h1>Add Lecture</h1>
            <form class="was-validated" onSubmit={this.handleFormSubmit}>
                <div class="form-group">
                    <label for="lecturetitle">Lecture Name</label>
                    <input type="text" class="form-control" name="lecturetitle" id="lecturetitle" placeholder="Title" value={this.state.lecturetitle} onChange={this.handleValueChange} required/>
                </div>
                <div class="form-group">
                    <label for="lecturedesc">Lecture Description</label>
                    <textarea class="form-control" name="lecturedesc" id="lecturedesc" rows="3" placeholder="Lecture Description" value={this.state.lecturedesc} onChange={this.handleValueChange} required></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-outline-success p-3 my-2 my-sm-0" type="submit">Submit</button>
                    <a class="btn btn-outline-danger p-3 my-2 my-sm-0" href={"/lecture/"+this.state.classid}>Cancel</a>
                </div>
            </form>
      </div>
    );
  }
}

export default MakeLecturePage;
