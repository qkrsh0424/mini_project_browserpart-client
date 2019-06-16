import React, { Component } from 'react';
import Axios from 'axios';
// get the video
import ReactPlayer from 'react-player'


class ContentsSource extends Component {
    constructor(props){
        super(props);
        this.state={
            lecturesource:"",
            materialURL:""
        }
    }
    componentDidMount(){
        this.callApi()
        .then(res => this.setState({lecturesource: res}))
        .catch(err => console.log(err));
    }
    callApi = async() => {
        const response = await fetch('/api/sourcelist/'+this.props.lectureS.lecture_s_id);
        const body = await response.json();
        return body;
        }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AddVideo();
        window.location.reload();
        }
    
        handleLogout = (e) =>{
            localStorage.clear();
            window.location.reload();
        }
    
        handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        }

        AddVideo = () =>{
            const url = "/api/addVideoUrl/"+this.props.lectureS.lecture_s_id+"/1";
            let formData = new FormData();
            formData.append("materialURL", this.state.materialURL);    
            
            Axios.post(url,{
                materialURL:this.state.materialURL
            })
            .then(function (response) {
        
              })
              .catch(function (error) {
                console.log(error);
              });
              
              this.setState({
                materialURL:''
              });
            // return post(url,formData,config);
        }
  render(){
        const { classes } = this.props;

        if(this.state.lecturesource[0]){
            return(
                <div>
                    {/* lecture mainlist start */}
                    <h3><button class="float-right btn btn-info" data-toggle="collapse" href="#addVideo" role="button" aria-expanded="false" aria-controls="addVideo">Add Video</button></h3>
                    {/* ADD NEW LECTURE FORM start */}
                    <div class="collapse" id="addVideo">
                    <div class="card card-body">
                        <form class="was-validated" onSubmit={this.handleFormSubmit}>
                        <div class="form-group">
                            <label for="materialURL">Video URL</label>
                            <input type="input" class="form-control" id="materialURL" placeholder="URL" name="materialURL" value={this.state.addlecturetitle} onChange={this.handleValueChange} required/>
                        </div>
                            <button class="btn btn-outline-success p-2" type="submit">ADD</button>
                        </form>
                    </div>
                    </div>
                    {/* ADD NEW LECTURE FORM end */}
                    {this.state.lecturesource?this.state.lecturesource.map((rows)=>{
                        return(
                            <div>
                                {rows.item==1?<ReactPlayer url={rows.material} controls/>:""}
                                <br/>
                            </div>
                        );
                    }):""}
                    {this.state.lecturesource?this.state.lecturesource.map((rows)=>{
                        return(
                            <div>
                                {rows.item==2?<h3>{rows.material}</h3>:""}
                                <br/>
                            </div>
                        );
                    }):""}
                </div>
            );
        }else{
            return(
                <div>
                    {/* lecture mainlist start */}
                    <h3><button class="float-right btn btn-info" data-toggle="collapse" href="#addVideo" role="button" aria-expanded="false" aria-controls="addVideo">Add Video</button></h3>
                    {/* ADD NEW LECTURE FORM start */}
                    <div class="collapse" id="addVideo">
                    <div class="card card-body">
                        <form class="was-validated" onSubmit={this.handleFormSubmit}>
                        <div class="form-group">
                            <label for="materialURL">Video URL</label>
                            <input type="input" class="form-control" id="materialURL" placeholder="URL" name="materialURL" value={this.state.addlecturetitle} onChange={this.handleValueChange} required/>
                        </div>
                            <button class="btn btn-outline-success p-2" type="submit">ADD</button>
                        </form>
                    </div>
                    </div>
                    {/* ADD NEW LECTURE FORM end */}
                    <h3>nothing material</h3>
                </div>
            );
        }
  }
}

export default ContentsSource;
