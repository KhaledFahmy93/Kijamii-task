import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Lists from './Components/list';
import Show from './Components/show';
import Search from './Components/search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'block',
       },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results : [],
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
        <AppBar color="primary" position="static">
          <Toolbar>
              <IconButton edge="start" component={Link} to="/"
                className={classes.menuButton} color="inherit" aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <TypoGraphy className={classes.title}
                color="inherit" variant="h6" noWrap
              >
                Home
            </TypoGraphy>
            <Button component={Link} to={"/search"}  
                 color="inherit">
                  Search
            </Button>
          </Toolbar>
      </AppBar>
        <Switch>
            <Route exact path='/' component={Lists} />
            <Route path='/search' component={Search} />
            <Route exact path={`/show/:id`} component={Show} />
            <Route path="/" render={ ()=> <div> 404 </div>} />
        </Switch>
      </Router>
      </div>
    );
  }
}
export default withStyles(styles)(App);
