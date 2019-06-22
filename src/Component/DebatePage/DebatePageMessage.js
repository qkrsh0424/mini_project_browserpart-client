import React, { Component } from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import avatar from '../../images/people.jpg';
import Axios from 'axios';

// import SendMessage from './SendMessage';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      progress: {
        margin: theme.spacing.unit * 2,
      }
  });

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//     inline: {
//       display: 'inline',
//     },
//   }),
// );

class DebatePageMessage extends Component {
    constructor(props){
        super(props);
        this.state={
            user_id : localStorage.getItem('userid'),
            user_name : localStorage.getItem('username'),
            user_type:1,
            content:"",
            message:"",
        }
    }
    componentDidMount(){
        this.callApi()
        .then(res => this.setState({message: res}))
        .catch(err => console.log(err))
    }

    callApi = async() => {
        // console.log(this.props.classid);
        const response = await fetch('/api/debate/'+this.props.classid);
        const body = await response.json();
        return body;
    }

    handleLogout = (e) =>{
        localStorage.clear();
        window.location.reload();
    }

    stateRefresh = () => {
        this.setState({
            message:''
        });
        this.callApi()
        .then(res => this.setState({message: res}))
        .catch(err => console.log(err))
    }

    SendMessageApi = () =>{
        const url = "/api/debate/"+this.props.classid;
        let formData = new FormData();
        formData.append("class_id", this.props.classid);
        formData.append("user_id", this.state.user_id);
        formData.append("user_name", this.state.user_name);
        formData.append("user_type", this.state.user_type);
        formData.append("content", this.state.content);
        
        Axios.post(url,{
            class_id:this.props.classid,
            user_id: this.state.user_id,
            user_name: this.state.user_name,
            user_type: this.state.user_type,
            content: this.state.content,
        })
        .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({
              content:''
          });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.SendMessageApi();
        this.stateRefresh();
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  render(){
      const { classes } = this.props;
    return (
        <div>
            <div className="overflow-auto my_messagebox">
                <List className={classes.root}>
                {this.state.message?this.state.message.map((row)=>{
                    return(
                        <div>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary={row.user_name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            ---
                                        </Typography>
                                        {row.content}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                        </div>
                    );
                }):<CircularProgress className={classes.progress} />}
                </List>
                {/* <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={avatar} />
                        </ListItemAvatar>
                        <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List> */}
                {/* <SendMessage/> */}
            </div>
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                        <label for="content">user name : {this.state.user_name}</label>
                        <input type="text" class="form-control" name="content" id="content" placeholder="Enter message..." value={this.state.content} onChange={this.handleValueChange}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>
            </div>
        </div>
    );
  }
}

// class SendMessage extends Component {
//     render(){
//       return (
//           <div>
//               <form onSubmit={this.handleFormSubmit}>
//                   <div class="form-group">
//                       <label for="content">user name : </label>
//                       <input type="text" class="form-control" name="content" id="content" placeholder="Enter message..." value={this.state.content} onChange={this.handleValueChange}/>
//                   </div>
//                   <button type="submit" class="btn btn-primary">Send</button>
//               </form>
//           </div>
//       );
//     }
//   }

export default withStyles(styles)(DebatePageMessage);
