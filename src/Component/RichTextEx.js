import React,{ Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import Axios from 'axios';

class RichTextEx extends Component{
  constructor(props){
    super(props);
    this.state={
      body:"",
      richList:""
    }
    this.onHanldeChange = this.onHanldeChange.bind(this);
  }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({richList: res}))
        .catch(err => console.log(err))
    }

    callApi = async() => {
        const response = await fetch('/api/richtext/');
        const body = await response.json();
        return body;
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AddRichText();
        window.location.reload();
    }

    onHanldeChange(e) {
        this.setState({body: e})
    }

    AddRichText = () =>{
        const url = "/api/richtext/";
        let formData = new FormData();
        formData.append("body", this.state.body);
        
        Axios.post(url,{
            body:this.state.body
        })
        .then(function (response) {
    
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.setState({
            body:''
          });
        // return post(url,formData,config);
    }

  render(){
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <ReactQuill
              modules={RichTextEx.modules}
              formats={RichTextEx.formats}
              value={this.state.body}
              placeholder="Body"
              onChange={this.onHanldeChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">Post</button>
        </form>

        <div>
            {this.state.richList?this.state.richList.map((rows)=>{
                return(
                    <div>
                        {renderHTML(rows.body)}
                    </div>
                );
            }):""}
        </div>
      </div>
    );
  }
}

RichTextEx.modules = {
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

RichTextEx.formats = [
  'header', 'font', 'size',
  'bold','italic','underline','strike','blockquote',
  'list','bullet',
  'link', 'image', 'video', 'code-block'
];

export default RichTextEx;
