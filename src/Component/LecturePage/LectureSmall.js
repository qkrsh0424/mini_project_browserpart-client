import React, { Component } from 'react';

class LectureSmall extends Component {
    constructor(props){
        super(props);
        this.state = {
            classid:"",
            // lecture_b_id:"",
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
                                            <a href={"/LectureContentsPage/"+rowS.lecture_s_id}> {rowS.lecture_s_title} </a>
                                        </td>
                                        <td>
                                            <div class="text-right">
                                                <form action="/delete/slecture" method="post">
                                                    <button class="btn btn-outline-primary p-1" type="button" onclick='window.location="/main"'>UPDATE</button>
                                                    <button class="btn btn-outline-danger p-1" type="submit" name="num1lec">DELETE</button>
                                                </form>
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
