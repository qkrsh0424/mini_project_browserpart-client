import React,{ Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import './css/CreateHomework.css';

class CreateHomework extends Component{
  constructor(props){
    super(props);
    this.state={
        classid:this.props.match.params.classid,
        body:"",
        homeworktitle:"",
    }
    this.onHanldeChange = this.onHanldeChange.bind(this);
  }

    // componentDidMount(){
    //     this.callApi()
    //     .then(res => this.setState({richList: res}))
    //     .catch(err => console.log(err))
    // }

    // callApi = async() => {
    //     const response = await fetch('/api/richtext/');
    //     const body = await response.json();
    //     return body;
    // }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AddRichText();
        window.location.href="/homework/"+this.state.classid;
    }

    onHanldeChange(e) {
        this.setState({body: e})
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    AddRichText = () =>{
        const url = "/api/createHomework/"+this.state.classid;
        let formData = new FormData();
        formData.append("body", this.state.body);
        formData.append("homeworktitle", this.state.homeworktitle);
        
        Axios.post(url,{
            body:this.state.body,
            homeworktitle:this.state.homeworktitle
        })
        .then(function (response) {
    
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.setState({
            body:'',
            homeworktitle:''
          });
        // return post(url,formData,config);
    }

  render(){
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
            <TextField
                id="outlined-full-width"
                label="Title"
                style={{ marginTop: 30 }}
                placeholder="Title"
                helperText="Input the Homework title"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                name="homeworktitle"
                value={this.state.homeworktitle}
                onChange={this.handleValueChange}
            />
          <div className="form-group">
            <ReactQuill
              modules={CreateHomework.modules}
              formats={CreateHomework.formats}
              value={this.state.body}
              placeholder="Body"
              onChange={this.onHanldeChange}
              className="quill_height"
            />
          </div>
          <button className="btn btn-primary" type="submit">Post</button>
        </form>
      </div>
    );
  }
}

CreateHomework.modules = {
  toolbar:[
    [{ header:'1'}, { header:'2'}, { font:[]}],
    [{size:[]}],
    ['bold','italic','underline','strike','blockquote'],
    [{'list':'ordered'}, {'list':'bullet'}],
    ['link','image','video'],
    ['clean'],
    ['code-block']
  ]
};

CreateHomework.formats = [
  'header', 'font', 'size',
  'bold','italic','underline','strike','blockquote',
  'list','bullet',
  'link', 'image', 'video', 'code-block'
];

export default CreateHomework;
