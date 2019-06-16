import React, { Component } from 'react';

class LectureSmall extends Component {
    constructor(props){
        super(props);
        this.state = {
            classid:this.props.classid,
            lecture_b_id:this.props.lecture_b_id,
            lectureListS:""
        }
    }
    componentDidMount(){
        this.callApi()
        .then(res => this.setState({lectureListS: res}))
        .catch(err => console.log(err));
        }

    callApi = async() => {
        const response = await fetch('/api/lecturesmall/'+this.props.lecture_b_id);
        const body = await response.json();
        return body;
    }

    deleteSmallLecture(lecture_s_id){
        const url = '/api/deleteSmallLecture/'+lecture_s_id;
        fetch(url,{
            method:'DELETE'
        });
        this.stateRefresh();
    }

    stateRefresh = () =>{
        this.setState({
            lectureListS:''
        });
        // this.callApi()
        //   .then(res => this.setState({classlist: res}))
        //   .catch(err => console.log(err))
  
        this.callApi()
          .then(res => this.setState({lectureListS: res}))
          .catch(err => console.log(err));
      }
  render(){
    return (
        <div>
            <div id={"collapse"+this.props.lecture_b_id} class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        <table class="table table-striped my_small_font">
                            <tbody>
                            {this.state.lectureListS ? this.state.lectureListS.map((rowS)=>{
                                return(
                                    <tr>
                                        {/* <th scope="row">1</th> */}
                                        <td colspan="2" class="text-center">
                                            {/* <a href={"/LectureContentsPage/"+rowS.lecture_s_id}> {rowS.lecture_s_title} </a> */}
                                            <a href={"/lecturecontents/"+this.state.classid+"/"+this.state.lecture_b_id+"/"+rowS.lecture_s_id}> {rowS.lecture_s_title} </a>
                                        </td>
                                        <td>
                                            <div class="text-right">
                                                <button class="btn btn-outline-primary p-1" type="button" onclick='window.location="/main"'>UPDATE</button>
                                                <button class="btn btn-outline-danger p-1" onClick={(e)=>{this.deleteSmallLecture(rowS.lecture_s_id)}}>DELETE</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }):""}
                            </tbody>

                        </table>
                    </div>
                </div>
        </div>
    );
  }
}

export default LectureSmall;
