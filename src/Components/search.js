import React from "react";

import axios from 'axios';
import { Grid, Paper} from "@material-ui/core";
import { Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import InputBase from '@material-ui/core/InputBase';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import { fade , withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
       display: 'block',
     },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
     backgroundColor: fade(theme.palette.common.white, 0.15),
     '&:hover': {
       backgroundColor: fade(theme.palette.common.white, 0.25),
     },
    marginRight: 90,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
  },
    color: 'inherit',
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results : [],
    }
  }
  handleInputChange = (event) => {
    this.setState({query: event.target.value} , () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
           this.getInfo()
        }
      }
    })
  }

   getInfo = async () => {
    await axios.get(`http://api.tvmaze.com/search/shows?q=${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data,
        });
        console.log(data)
      })
  }


  render(){
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={this.handleInputChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <Grid container justify="center">
          <TableContainer component={Paper} >
        <Table aria-label="simple table"> 
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">language</TableCell>
              <TableCell align="center">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.results.map(row => (
              <TableRow key={row.show.id}>
                <TableCell component="th" scope="row" align="center">
                  {row.show.name}
                </TableCell>
                <TableCell align="center">{row.show.language}</TableCell>
                <TableCell align="center">              
                  <div>
                    <Link to={"/show/"+row.id} 
                      className="btn btn-primary"
                      >show</Link>
                  </div>     
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
</div>
    )
  };
}
export default withStyles(styles)(Search);

