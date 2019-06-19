import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class ListTable extends Component{
    constructor(props){
        super(props);
        this.state={
            studentList:""
        }
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({studentList: res}))
        .catch(err => console.log(err))
      }
    
      callApi = async() => {
        const response = await fetch('/api/studentlist/'+this.props.classid);
        const body = await response.json();
        return body;
      }

    render(){
        const {classes} = this.props;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Number.</TableCell>
                        <TableCell align="right">Wechat ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.studentList?this.state.studentList.map((row,i) => (
                        <TableRow key={row.student_id}>
                        <TableCell component="th" scope="row">
                            {++i}
                        </TableCell>
                        <TableCell align="right">{row.wechat_info_id}</TableCell>
                        <TableCell align="right">{row.wechat_name}</TableCell>
                        {/* <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    )):""}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(ListTable);