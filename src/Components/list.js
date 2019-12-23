import React from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TVShows :[],
      page:0,
      rowsPerPage:10 ,
    };
  }
  handleChangePage  = (page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({'rowsPerPage':event.target.value });
  };

  render() {
    const { TVShows, rowsPerPage, page } = this.state;
    return (
      <div style={{ marginTop: 20, padding: 30 }}>
        <Grid container justify="center">
          <TableContainer component={Paper} >
            <Table aria-label="custom pagination table"> 
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Season</TableCell>
              <TableCell align="center">Runtime</TableCell>
              <TableCell align="center">Summary</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.TVShows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.season}</TableCell>
                <TableCell align="center">{row.runtime}</TableCell>
                <TableCell align="center">{row.summary}</TableCell>
                <TableCell align="center">              
                  <Button component={Link}
                    variant="contained" color="primary"  to={"/show/"+row.id}>
                    Show
                  </Button>     
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </TableContainer>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"  
              count={TVShows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
        </Grid>
    </div>
    );
  }

  async componentDidMount() {
    axios.get(`http://api.tvmaze.com/schedule/full`)
    .then(res => {
      const TVShows = res.data;
      this.setState({ TVShows });
    });
  }
}
export default List;
